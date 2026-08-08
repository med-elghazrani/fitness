#!/bin/bash

set -e

# =============================================================================
# Configuration
# =============================================================================

PORT_DB=5432
PORT_BACKEND=3000
PORT_FRONTEND=8080

BACKEND_PID=""
FRONTEND_PID=""

# =============================================================================
# Utility functions
# =============================================================================

is_port_in_use() {
    lsof -i :"$1" > /dev/null 2>&1
}

kill_port() {
    local port=$1
    local pid
    pid=$(lsof -t -i :"$port" 2>/dev/null)
    if [ -n "$pid" ]; then
        echo "  Killing process on port $port (PID: $pid)"
        kill -9 "$pid" 2>/dev/null || true
    fi
}

wait_for_url() {
    local url=$1
    until curl -s "$url" > /dev/null 2>&1; do
        sleep 1
    done
}

# =============================================================================
# Port management
# =============================================================================

force_kill_all_ports() {
    echo "Force mode: killing processes on required ports..."
    kill_port $PORT_DB
    kill_port $PORT_BACKEND
    kill_port $PORT_FRONTEND
    docker compose down 2>/dev/null || true
    sleep 2
}

check_ports_availability() {
    echo "Checking ports availability..."
    local ports_in_use=""

    is_port_in_use $PORT_DB && ports_in_use="$ports_in_use $PORT_DB (PostgreSQL)"
    is_port_in_use $PORT_BACKEND && ports_in_use="$ports_in_use $PORT_BACKEND (Backend)"
    is_port_in_use $PORT_FRONTEND && ports_in_use="$ports_in_use $PORT_FRONTEND (Frontend)"

    if [ -n "$ports_in_use" ]; then
        echo "Error: The following ports are already in use:$ports_in_use"
        echo ""
        echo "Use './start.sh --force' to kill processes on these ports and start anyway."
        exit 1
    fi

    echo "All ports available!"
}

# =============================================================================
# Service launchers
# =============================================================================

start_database() {
    echo "[1/3] Starting PostgreSQL on port $PORT_DB..."
    docker compose up -d
    sleep 3
}

start_backend() {
    echo "[2/3] Starting backend on port $PORT_BACKEND..."
    (cd backend && mvn spring-boot:run) &
    BACKEND_PID=$!

    echo "  Waiting for backend to be ready..."
    wait_for_url "http://localhost:$PORT_BACKEND/api/time"
    echo "  Backend ready!"
}

start_frontend() {
    echo "[3/3] Starting frontend on port $PORT_FRONTEND..."
    (cd frontend && npm install && npm run dev) &
    FRONTEND_PID=$!
}

# =============================================================================
# Cleanup
# =============================================================================

cleanup() {
    echo ""
    echo "Shutting down services..."
    [ -n "$BACKEND_PID" ] && kill "$BACKEND_PID" 2>/dev/null || true
    [ -n "$FRONTEND_PID" ] && kill "$FRONTEND_PID" 2>/dev/null || true
    docker compose down 2>/dev/null || true
    echo "Done."
}

# =============================================================================
# Main
# =============================================================================

main() {
    if [ "$1" = "--force" ]; then
        force_kill_all_ports
    fi

    check_ports_availability

    echo ""
    echo "=== Proto Sirius - Starting all services ==="
    echo ""

    start_database
    start_backend
    start_frontend

    echo ""
    echo "=== All services started ==="
    echo "  Frontend: http://localhost:$PORT_FRONTEND"
    echo "  Backend:  http://localhost:$PORT_BACKEND"
    echo ""
    echo "Press Ctrl+C to stop all services"

    trap cleanup EXIT
    wait
}

main "$@"
