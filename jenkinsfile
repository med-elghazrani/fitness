pipeline {
    agent any

    stages {
        stage('Backend') {
            steps {
                sh 'cd backend && mvn clean package -DskipTests'
            }
        }

        stage('Frontend') {
            steps {
                sh 'cd frontend && npm ci && npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cp backend/target/backend-1.0.0.jar /opt/fitness/backend.jar
                    rm -rf /var/www/fitness/*
                    cp -r frontend/dist/* /var/www/fitness/
                    sudo systemctl restart fitness-backend
                    sudo systemctl reload nginx
                '''
            }
        }
    }
}