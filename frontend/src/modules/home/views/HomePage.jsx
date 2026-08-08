import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

const features = [
    { path: '/diet', title: 'Nutrition Plan', desc: 'Calculate your daily calories, macros and get an ingredient plan.', emoji: '🥗' },
    { path: '/bmi', title: 'BMI', desc: 'Check your Body Mass Index.', emoji: '⚖️' },
    { path: '/recommendation', title: 'Workout Recommendation', desc: 'Get training sessions tailored to your goal.', emoji: '🏋️' },
    { path: '/calories', title: 'Calories Burned', desc: 'Track calories burned during your sessions.', emoji: '🔥' },
    { path: '/stats', title: 'My Stats', desc: 'See your measurement history.', emoji: '📊' },];

const HomePage = () => {
    const { user } = useAuth();


        return ( 
        <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black text-primary mb-4">Fitness Goal Road</h1>
                    <p className="text-xl font-semibold opacity-70">
                        {user ? `Welcome back, ${user.prenom}!` : 'Reach your fitness goals with a plan built around you.'}
                    </p>
                    {!user ? (
                        <div className="mt-6 flex justify-center gap-4">
                            <Link to="/register" className="btn btn-primary btn-lg text-xl font-black">Get Started</Link>
                            <Link to="/login" className="btn btn-outline btn-lg text-xl font-black">Log In</Link>
                        </div>
                    ) : null}
                </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
            <Link key={i} to={f.path} className="card bg-base-100 shadow-xl hover:scale-105 transition-transform border-2 border-transparent hover:border-primary">
    <div className="card-body">
        <span className="text-5xl mb-2">{f.emoji}</span>
                <h2 className="card-title text-2xl font-black">{f.title}</h2>
        <p className="opacity-70 font-semibold">{f.desc}</p>
    </div>
            </Link>
        ))}
                </div>
            </div>
        </div>
    );
};


export default HomePage;
