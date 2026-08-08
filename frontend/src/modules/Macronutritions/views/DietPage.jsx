import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import QuizForm from '../components/QuizForm';
import ResultDisplay from '../components/ResultDisplay';
import AdjustmentForm from '../components/AdjustmentForm';
import { calculateNutrition, adjustNutrition, saveNutritionHistory } from '../api/api';
import { useAuth } from '../../auth/context/AuthContext';

const DietPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [etape, setEtape] = useState(user ? 'quiz' : 'auth');
    const [loading, setLoading] = useState(false);
    const [resultatCalc, setResultatCalc] = useState(null);
    const [resultatAjust, setResultatAjust] = useState(null);
    const [userData, setUserData] = useState(null);

    const handleGuest = () => setEtape('quiz');

    const handleQuizSubmit = async (formData) => {
        setLoading(true);
        try {
            const res = await calculateNutrition(formData);
            setResultatCalc(res);
            setUserData(formData);
            setEtape('result');

            if (user) { saveNutritionHistory(user.id, res.macronutrients).catch((err) => console.error(err)); }
        } catch (err) {
            alert('Error calculating nutrition. Please try again.');
            console.error(err);
        } finally {setLoading(false); }};

    const handleAjuster = () => setEtape('adjustment');

    const handleGoToMicro = () => {
        navigate('/micro', { state: { profileData: userData } });
    };

    const handleGoToIngredients = () => {
        navigate('/ingredients', { state: { macros: resultatCalc.macronutrients } });
    };

    const handleAdjustmentSubmit = async (data) => {
        setLoading(true);
        try {
            const res = await adjustNutrition(data);
            setResultatAjust(res);
        } catch (err) {
            alert('Error adjusting nutrition. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const initialData = user ? {
        poids: user.poids, taille: user.taille,
        sex: user.sex, anneeNaissance: user.anneeNaissance,
    } : undefined;

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">








                {etape === 'auth' && (
                    <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-primary">
                        <div className="card-body text-center">
                            <h2 className="card-title text-5xl font-black justify-center mb-6 text-primary">Diet Goal Road</h2>
                            <div className="alert alert-warning shadow-xl mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="text-xl font-bold">You are not connected</span>
                            </div>
                            <p className="text-xl font-semibold mb-8">Sign in to save your progress or continue as a guest to get started immediately.</p>
                            <div className="card-actions justify-center gap-4">
                                <Link to="/login" className="btn btn-primary btn-lg text-xl font-black">Sign In</Link>
                                <button className="btn btn-secondary btn-lg text-xl font-black shadow-xl hover:scale-105 transition-transform" onClick={handleGuest}>Continue as Guest</button>
                            </div>
                        </div>
                    </div>
                )}






                {etape === 'quiz' && (
                    <QuizForm onSubmit={handleQuizSubmit} loading={loading} initialData={initialData} />
                )}







                {etape === 'result' && resultatCalc && (
                    <ResultDisplay
                        result={resultatCalc}
                        onAdjust={handleAjuster}
                        onGoToMicro={handleGoToMicro}
                        onGoToIngredients={handleGoToIngredients}
                    />
                )}







                {etape === 'adjustment' && (
                    <AdjustmentForm
                        currentWeight={userData.poids}
                        goal={userData.goal}
                        tdee={resultatCalc.tdee}
                        onSubmit={handleAdjustmentSubmit}
                        loading={loading}
                        adjustmentResult={resultatAjust}
                    />
                )}
            </div>
        </div>
    );
};

export default DietPage;
