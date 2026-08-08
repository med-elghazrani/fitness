import { useState } from 'react';

const QuizForm = ({ onSubmit, loading, initialData }) => {
    const [formData, setFormData] = useState({
        anneeNaissance: '',
        sex: 'MALE',
        poids: '',
        taille: '',
        activityLevel: 'MODERE',
        goal: 'GAIN_MASSE_MUSCULAIRE',
        ...initialData});




    const handleChange = (e) => {
        const { name, value } = e.target; let parsedValue = value;

        if (name === 'anneeNaissance') {
            parsedValue = parseInt(value);
        } else if (name === 'poids' || name === 'taille') {
            parsedValue = parseFloat(value);}

        setFormData(prev => ({ ...prev, [name]: parsedValue }));};






    const handleSubmit = (e) => {
        e.preventDefault(); onSubmit(formData);};





        

    return (
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-primary">
            <div className="card-body">
                <h2 className="card-title text-4xl font-black mb-8 text-primary">
                    Your Profile Information
                </h2>
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="form-control">
                        <div className="flex items-center gap-8">
                            <label className="label min-w-[200px]"><span className="label-text text-xl font-bold">Birth Year</span></label>
                            <input
                                type="number" name="anneeNaissance" value={formData.anneeNaissance} onChange={handleChange}
                                className="input input-bordered input-lg text-xl font-semibold border-2 focus:border-primary pl-6 flex-1"
                                placeholder="1990" required min="1900" max={new Date().getFullYear()} />
                        </div>
                    </div>


                    <div className="form-control">
                        <div className="flex items-center gap-8">
                            <label className="label min-w-[200px]">
                                <span className="label-text text-xl font-bold">Sex</span>
                            </label>
                            <select
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                className="select select-bordered select-lg text-xl font-semibold border-2 focus:border-primary pl-6 flex-1"
                            >
                                <option value="MALE">Male</option><option value="FEMALE">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="flex items-center gap-8">
                            <label className="label min-w-[200px]">
                                <span className="label-text text-xl font-bold">Weight (kg)</span>
                            </label>
                            <input
                                type="number"
                                name="poids" value={formData.poids} onChange={handleChange}
                                className="input input-bordered input-lg text-xl font-semibold border-2 focus:border-primary pl-6 flex-1"
                                placeholder="70" required step="0.1" min="30" max="300" />
                        </div>
                    </div>


                    <div className="form-control">
                        <div className="flex items-center gap-8">
                            <label className="label min-w-[200px]"><span className="label-text text-xl font-bold">Height (m)</span></label>
                            <input
                                type="number" name="taille" value={formData.taille} onChange={handleChange}
                                className="input input-bordered input-lg text-xl font-semibold border-2 focus:border-primary pl-6 flex-1"
                                placeholder="1.75" required step="0.01" min="1" max="2.5" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="flex items-center gap-8">
                            <label className="label min-w-[200px]">
                                <span className="label-text text-xl font-bold">Activity Level</span>
                            </label>
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                className="select select-bordered select-lg text-xl font-semibold border-2 focus:border-primary pl-6 flex-1"
                            >
                                <option value="SEDENTAIRE">Sedentary (Little or no exercise)</option>
                                <option value="MODERE">Moderate (Exercise 1-3 times/week)</option>
                                <option value="ACTIF">Active (Exercise 3-5 times/week)</option>
                                <option value="TRES_ACTIF">Very Active (Exercise 6-7 times/week)</option>
                            </select>
                        </div>
                    </div>


                    <div className="form-control">
                        <label className="label pb-8">
                            <span className="label-text text-xl font-bold">Main Goal</span>
                        </label>
                        <select
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            className="select select-bordered select-lg text-xl font-semibold border-2 focus:border-primary pl-6"
                        >
                            <optgroup label="Weight Gain">
                                <option value="GAIN_POIDS">General Weight Gain</option>
                                <option value="GAIN_MASSE_MUSCULAIRE">Muscle Mass Gain</option>
                            </optgroup>
                            <optgroup label="Weight Loss">
                                <option value="PERTE_POIDS">General Weight Loss</option>
                                <option value="PERTE_GRASSE">Fat Loss</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : ('Calculate My Nutrition')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QuizForm;