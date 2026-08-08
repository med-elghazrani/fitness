const groupes = [
    {
        titre: "Vitamines",
        couleur: "from-purple-500 to-purple-700",
        items: [
            { cle: "vitamineA",   nom: "Vitamine A",   unite: "µg" },
            { cle: "vitamineB12", nom: "Vitamine B12", unite: "µg" },
            { cle: "vitamineC",   nom: "Vitamine C",   unite: "mg" },
            { cle: "vitamineD",   nom: "Vitamine D",   unite: "µg" },
            { cle: "vitamineE",   nom: "Vitamine E",   unite: "mg" },
        ],
    },
    {
        titre: "Mineraux",
        couleur: "from-emerald-500 to-emerald-700",
        items: [
            { cle: "fer",       nom: "Fer",       unite: "mg" },
            { cle: "calcium",   nom: "Calcium",   unite: "mg" },
            { cle: "magnesium", nom: "Magnesium", unite: "mg" },
            { cle: "zinc",      nom: "Zinc",      unite: "mg" },
        ],
    },
    {
        titre: "Electrolytes",
        couleur: "from-orange-500 to-orange-700",
        items: [
            { cle: "sodium",    nom: "Sodium",    unite: "mg" },
            { cle: "potassium", nom: "Potassium", unite: "mg" },
        ],
    },
];

const MicroResultDisplay = ({ result, onGoToMacros }) => {
    const micros = result.micronutrients;

    return (
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-purple-500">
            <div className="card-body">
                <h2 className="card-title text-4xl font-black mb-2" style={{ color: '#a855f7' }}>
                    Your Micronutrition Plan
                </h2>
                <p className="text-lg font-semibold opacity-70 mb-6">
                    Daily essential micronutrients — based on your profile (age {result.age})
                </p>
                <div className="space-y-8">
                    {groupes.map((grp) => (
                        <div key={grp.titre}>
                            <div className={`inline-block px-4 py-1 rounded-full text-white font-black text-lg mb-4 bg-gradient-to-r ${grp.couleur}`}>
                                {grp.titre}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {grp.items.map(({ cle, nom, unite }) => (
                                    <div key={cle} className={`card bg-gradient-to-br ${grp.couleur} text-white shadow-xl hover:scale-105 transition-transform`}>
                                        <div className="card-body p-5">
                                            <h3 className="text-base font-black leading-tight">{nom}</h3>
                                            <p className="text-3xl font-black mt-1">
                                                {micros[cle] % 1 === 0 ? micros[cle].toFixed(0) : micros[cle].toFixed(1)}
                                            </p>
                                            <p className="text-sm font-bold opacity-80">{unite}/day</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                {onGoToMacros && (
                    <div className="card-actions justify-end mt-8">
                        <button
                            onClick={onGoToMacros}
                            className="btn btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform"
                            style={{ backgroundColor: '#a855f7', color: 'white', borderColor: '#a855f7' }}>
                            ← Back to Macronutrients
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MicroResultDisplay;