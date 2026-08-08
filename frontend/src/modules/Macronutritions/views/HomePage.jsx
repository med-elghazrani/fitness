import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="hero min-h-screen bg-gradient-to-br from-primary via-secondary to-accent">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <h1 className="text-7xl font-black text-white mb-6 drop-shadow-lg">
                        Welcome to Fitness Goal Road
                    </h1>
                    <p className="text-2xl text-white font-semibold mb-10 drop-shadow">
                        Your journey to a healthier lifestyle starts here. Track your diet, manage your workouts, and achieve your fitness goals.
                    </p>
                    <Link to="/diet" className="btn btn-lg btn-accent text-xl font-bold hover:scale-110 transition-transform shadow-xl">
                        Start Your Journey
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;