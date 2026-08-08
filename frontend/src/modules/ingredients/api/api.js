const BASE = `${import.meta.env.VITE_API_URL || ''}/api/fitness`;

export const getIngredientPlan = async (macros) => {
    const res = await fetch(`${BASE}/ingredients/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            proteines: macros.proteins,
            glucides: macros.carbs,
            lipides: macros.fats,
        }),
    });
    if (!res.ok) throw new Error('Failed to generate ingredient plan');
    return res.json();
};
