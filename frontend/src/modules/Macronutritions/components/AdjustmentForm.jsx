import { useState } from 'react';

const AdjustmentForm = ({ currentWeight, goal, tdee, onSubmit, loading, adjustmentResult }) => {
    const [newWeight, setNewWeight] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            goal: goal,
            poidsActuel: currentWeight,
            nouveauPoids: parseFloat(newWeight),
            tdeeActuel: tdee
        });
    };

    return (
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-accent">
            <div className="card-body">
                <h2 className="card-title text-4xl font-black mb-6 text-accent">Adjust Your Plan</h2>

                {!adjustmentResult ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="alert alert-info shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-lg font-bold">Enter your weight after 10 days to adjust your nutrition plan</span>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-bold">Current Weight</span>
                            </label>
                            <input
                                type="number"
                                value={currentWeight}
                                className="input input-bordered input-lg text-xl font-semibold border-2"
                                disabled
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-xl font-bold">New Weight (kg)</span>
                            </label>
                            <input
                                type="number"
                                value={newWeight}
                                onChange={(e) => setNewWeight(e.target.value)}
                                className="input input-bordered input-lg text-xl font-semibold border-2 focus:border-accent"
                                placeholder="72.5"
                                required
                                step="0.1"
                                min="30"
                                max="300"
                            />
                        </div>

                        <div className="card-actions justify-end mt-8">
                            <button
                                type="submit"
                                className="btn btn-accent btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform"
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-spinner loading-lg"></span> : 'Adjust Plan'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className={`alert shadow-xl ${adjustmentResult.ajustementNecessaire ? 'alert-warning' : 'alert-success'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-xl font-bold">{adjustmentResult.message}</span>
                        </div>

                        <div className="stat bg-gradient-to-br from-primary to-primary-focus rounded-xl shadow-xl text-white">
                            <div className="stat-title text-white text-lg font-bold opacity-80">Weekly Rate</div>
                            <div className="stat-value text-5xl font-black">{adjustmentResult.tauxHebdomadaire.toFixed(2)}</div>
                            <div className="stat-desc text-white text-lg font-semibold">kg/week</div>
                        </div>

                        {adjustmentResult.ajustementNecessaire && adjustmentResult.macronutrients && (
                            <>
                                <div className="divider text-2xl font-black text-accent">New Macronutrients</div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="card bg-gradient-to-br from-primary to-primary-focus text-white shadow-xl hover:scale-105 transition-transform">
                                        <div className="card-body p-6">
                                            <h3 className="text-xl font-black">Calories</h3>
                                            <p className="text-4xl font-black">{adjustmentResult.macronutrients.calories.toFixed(0)}</p>
                                            <p className="text-lg font-bold opacity-80">kcal</p>
                                        </div>
                                    </div>

                                    <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-xl hover:scale-105 transition-transform">
                                        <div className="card-body p-6">
                                            <h3 className="text-xl font-black">Proteins</h3>
                                            <p className="text-4xl font-black">{adjustmentResult.macronutrients.proteins.toFixed(1)}</p>
                                            <p className="text-lg font-bold opacity-80">g</p>
                                        </div>
                                    </div>

                                    <div className="card bg-gradient-to-br from-accent to-accent-focus text-white shadow-xl hover:scale-105 transition-transform">
                                        <div className="card-body p-6">
                                            <h3 className="text-xl font-black">Carbs</h3>
                                            <p className="text-4xl font-black">{adjustmentResult.macronutrients.carbs.toFixed(1)}</p>
                                            <p className="text-lg font-bold opacity-80">g</p>
                                        </div>
                                    </div>

                                    <div className="card bg-gradient-to-br from-warning to-orange-500 text-white shadow-xl hover:scale-105 transition-transform">
                                        <div className="card-body p-6">
                                            <h3 className="text-xl font-black">Fats</h3>
                                            <p className="text-4xl font-black">{adjustmentResult.macronutrients.fats.toFixed(1)}</p>
                                            <p className="text-lg font-bold opacity-80">g</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdjustmentForm;