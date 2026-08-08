import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuizForm from '../../Macronutritions/components/QuizForm';
import MicroResultDisplay from '../components/MicroResultDisplay';
import { calculateMicronutrition } from '../api/api';

const MicroPage = () => {
    const [etape, setEtape] = useState('auth');
    const [loading, setLoading] = useState(false);
    const [microRes, setMicroRes] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const profil = location.state?.profileData;
        if (profil) {
            soumettreProfil(profil);
        }
    }, []);

    const handleGuest = () => setEtape('quiz');

    const soumettreProfil = async (formData) => {
        setLoading(true);
        setEtape('loading');
        try {
            const res = await calculateMicronutrition(formData);
            setMicroRes(res);
            setEtape('result');
        } catch (err) {
            alert('Erreur lors du calcul. Veuillez reessayer.');
            console.error(err);
            setEtape('quiz');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

            {etape === 'auth' && (
                <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-purple-500">
                    <div className="card-body text-center">
                        <h2 className="card-title text-5xl font-black justify-center mb-6" style={{ color: '#a855f7' }}>
                            Micro Goal Road
                        </h2>
                        <div className="alert alert-warning shadow-xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-xl font-bold">You are not connected</span>
                        </div>
                        <p className="text-xl font-semibold mb-8">
                            Sign in to save your progress or continue as a guest.
                        </p>
                        <div className="card-actions justify-center gap-4">
                            <button className="btn btn-primary btn-lg text-xl font-black" disabled>
                                Sign In
                            </button>
                            <button
                                className="btn btn-lg text-xl font-black shadow-xl hover:scale-105 transition-transform"
                                style={{ backgroundColor: '#a855f7', color: 'white', borderColor: '#a855f7' }}
                                onClick={handleGuest}>
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {etape === 'loading' && (
                <div className="flex justify-center items-center min-h-[400px]">
                    <span className="loading loading-spinner loading-lg" style={{ color: '#a855f7' }}></span>
                </div>
            )}

            {etape === 'quiz' && (
                <QuizForm onSubmit={soumettreProfil} loading={loading} />
            )}

            {etape === 'result' && microRes && (
                <MicroResultDisplay
                    result={microRes}
                    onGoToMacros={() => { setEtape('quiz'); setMicroRes(null); }}
                />
            )}

            </div>
        </div>
    );
};

export default MicroPage;