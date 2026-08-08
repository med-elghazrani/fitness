const ResultDisplay = ({ result, onAdjust, onGoToMicro, onGoToIngredients }) => {
    return (
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-secondary">
            <div className="card-body">
                <h2 className="card-title text-4xl font-black mb-6 text-secondary">Your Nutrition Plan</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="stat bg-gradient-to-br from-primary to-primary-focus rounded-xl shadow-xl text-white">
                        <div className="stat-title text-white text-lg font-bold opacity-80">BMR</div>
                        <div className="stat-value text-5xl font-black">{result.bmr.toFixed(0)}</div>
                        <div className="stat-desc text-white text-lg font-semibold">kcal/day</div>
                    </div>
                    <div className="stat bg-gradient-to-br from-secondary to-secondary-focus rounded-xl shadow-xl text-white">
                        <div className="stat-title text-white text-lg font-bold opacity-80">TDEE</div>
                        <div className="stat-value text-5xl font-black">{result.tdee.toFixed(0)}</div>
                        <div className="stat-desc text-white text-lg font-semibold">kcal/day</div>
                    </div>
                    <div className="stat bg-gradient-to-br from-accent to-accent-focus rounded-xl shadow-xl text-white">
                        <div className="stat-title text-white text-lg font-bold opacity-80">BMI</div>
                        <div className="stat-value text-5xl font-black">{result.bmi.toFixed(1)}</div>
                        <div className="stat-desc text-white text-lg font-semibold">kg/m²</div>
                    </div>
                </div>

                <div className="divider text-2xl font-black text-secondary">Macronutrients</div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body p-6">
                            <h3 className="text-xl font-black">Calories</h3>
                            <p className="text-4xl font-black">{result.macronutrients.calories.toFixed(0)}</p>
                            <p className="text-lg font-bold opacity-80">kcal</p>
                        </div>
                    </div>
                    <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body p-6">
                            <h3 className="text-xl font-black">Proteins</h3>
                            <p className="text-4xl font-black">{result.macronutrients.proteins.toFixed(1)}</p>
                            <p className="text-lg font-bold opacity-80">g</p>
                        </div>
                    </div>
                    <div className="card bg-gradient-to-br from-accent to-accent-focus text-white shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body p-6">
                            <h3 className="text-xl font-black">Carbs</h3>
                            <p className="text-4xl font-black">{result.macronutrients.carbs.toFixed(1)}</p>
                            <p className="text-lg font-bold opacity-80">g</p>
                        </div>
                    </div>
                    <div className="card bg-gradient-to-br from-warning to-orange-500 text-white shadow-xl hover:scale-105 transition-transform">
                        <div className="card-body p-6">
                            <h3 className="text-xl font-black">Fats</h3>
                            <p className="text-4xl font-black">{result.macronutrients.fats.toFixed(1)}</p>
                            <p className="text-lg font-bold opacity-80">g</p>
                        </div>
                    </div>
                </div>

                <div className="card-actions justify-end mt-8 gap-4">
                    <button onClick={onAdjust} className="btn btn-secondary btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform">
                        Adjust My Plan
                    </button>
                    {onGoToIngredients && (
                        <button
                            onClick={onGoToIngredients}
                            
                            className="btn btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform"

                            style={{ backgroundColor: '#10b981', color: 'white', borderColor: '#10b981' }}>
                            See My Ingredients →
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;