import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientsList from '../components/IngredientsList';
import { getIngredientPlan } from '../api/api';

const IngredientsPage = () => {
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState(null);
    const [plan, setPlan] = useState(null);
    const [cibles, setCibles] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const macros = location.state?.macros;
        if (macros) {
            setCibles(macros);
            chargerPlan(macros);
        } else {
            setErreur('No macronutrients data found. Please calculate your nutrition plan first.');
        }
    }, []);


    const chargerPlan = async (macros) => {
        setLoading(true);
        setErreur(null);
        try {
            const res = await getIngredientPlan(macros);
            setPlan(res);
        } catch (err) {
            setErreur('Error generating ingredients plan. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {loading && (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <span className="loading loading-spinner loading-lg" style={{ color: '#10b981' }}></span>
                    </div>
                )}

                {!loading && erreur && (
                    <div className="alert alert-error shadow-xl">
                        <span className="text-lg font-bold">{erreur}</span>
                    </div>
                )}

                {!loading && plan && (
                    <IngredientsList plan={plan} cibles={cibles} onBack={() => navigate(-1)} />
                )}

            </div>
        </div>
    );
};

export default IngredientsPage;
