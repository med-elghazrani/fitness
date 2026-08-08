import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-gradient-to-r from-primary to-secondary shadow-xl">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-black text-white hover:scale-105 transition-transform">
                    FITNESS GOAL ROAD
                </Link>
                <ul className="menu menu-horizontal px-4">
                    <li>
                        <Link to="/diet" className="text-white font-bold text-lg hover:bg-white hover:text-primary transition-all">
                            Diet Goal Road
                        </Link>
                    </li>
                    <li>
                        <Link to="/micro" className="text-white font-bold text-lg hover:bg-white hover:text-purple-600 transition-all">
                            Micro Goal Road
                        </Link>
                    </li>
                    <li>
                        <Link to="/workout" className="text-white font-bold text-lg opacity-50 pointer-events-none">
                            Workout Goal Road
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-none">
                <button className="btn btn-accent font-bold text-lg">Sign In</button>
            </div>
        </div>
    );
};

export default Navbar;