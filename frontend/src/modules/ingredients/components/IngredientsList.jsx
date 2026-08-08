const EMOJIS = {
    "Poitrine de poulet": "🍗",
        "Blanc d'oeuf": "🥚",
    "Thon au naturel":"🐟",
        "Boeuf maigre": "🥩",
    "Saumon": "🐟",
            "Fromage blanc 0%": "🧀",
        "Yaourt grec":"🥣",
    "Tofu": "🧈",
        "Oeuf entier": "🥚",
    "Lentilles cuites": "🍲",
        "Dinde":"🍗",
    "Crevettes": "🦐",
        "Riz blanc cuit": "🍚",
    "Pates cuites": "🍝",
        "Avoine (flocons)":"🥣",
    "Pain complet": "🍞",
        "Pomme de terre cuite": "🥔",
    "Patate douce": "🍠",
        "Banane":"🍌",
    "Quinoa cuit": "🍚",
        "Pomme": "🍎",
    "Miel": "🍯",
        "Riz complet cuit": "🍚",
    "Semoule cuite":"🍚",
        "Huile d'olive": "🫒",
    "Amandes": "🌰",
        "Avocat": "🥑",
    "Beurre de cacahuete": "🥜",
        "Noix":"🌰",
    "Graines de chia": "🌱",
        "Brocoli": "🥦",
    "Epinards": "🥬",
        "Haricots verts": "🫛"
    }









    
    function getEmoji(nom){
    if(EMOJIS[nom]) return EMOJIS[nom]
        else return "🍽️"
    }
    
    const IngredientsList=(props)=>{
        const plan = props.plan
        const cibles = props.cibles
        const onBack=props.onBack
    
    var macros=[
            {label:'Proteins',actuel:plan.totalProteines,cible:cibles?.proteins,couleur:'#f43f5e'},
    { label: 'Carbs', actuel: plan.totalGlucides, cible: cibles?.carbs,couleur:'#f59e0b'},
            {label:'Fats',actuel:plan.totalLipides,cible:cibles?.fats,couleur:'#3b82f6'}
        ]
    
        return(
    <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4" style={{borderColor:'#10b981'}}>
        <div className="card-body">
        <h2 className="card-title text-4xl font-black mb-2" style={{ color: '#10b981' }}>
    🍽️ Your Daily Ingredient Plan
                    </h2>
        <p className="text-lg font-semibold opacity-70 mb-8">Eat these ingredients today, in these quantities, to cover your daily needs.</p>
    
    <div className="space-y-4 mb-10">
    {macros.map((m,i)=>{
        return <div key={i}>
            <div className="flex justify-between items-baseline mb-1">
    <span className="font-black text-lg">{m.label}</span>
                <span className="font-bold opacity-70">
        {m.actuel.toFixed(0)} / {m.cible ? m.cible.toFixed(0) : '?'} g
                </span>
            </div>
                <progress className="progress w-full" value={m.actuel} max={m.cible || m.actuel} style={{accentColor:m.couleur}}/>
        </div>
    })}
        <p className="text-right font-bold opacity-70">
            ~{plan.totalCalories.toFixed(0)} kcal for the day</p>
    </div>
    
                    <div className="divider text-2xl font-black" style={{ color: '#10b981' }}>What to eat</div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
        plan.ingredients.map((item,index)=>(
    <div key={index} className="card bg-base-100 shadow-lg hover:scale-105 transition-transform">
        <div className="card-body p-5 flex-row items-center gap-4">
            <span className="text-4xl">{getEmoji(item.nom)}</span>
                                    <div>
            <p className="font-black text-lg leading-tight">{item.nom}</p>
                                        <p className="text-2xl font-black" style={{color: '#10b981'}}>
        {item.grammes.toFixed(0)} g
                                        </p>
        </div>
                </div>
            </div>
        ))
        }
                    </div>
    
        {onBack ? (
            <div className="card-actions justify-end mt-10">
            <button onClick={onBack} className="btn btn-lg w-full text-xl font-black shadow-xl hover:scale-105 transition-transform" style={{backgroundColor: '#10b981', color: 'white', borderColor: '#10b981'}}>
                ← Back to Macronutrients
                            </button>
        </div>
        ) : null}
                </div>
            </div>
        )
    }
    
    export default IngredientsList
    