const BASE = `${import.meta.env.VITE_API_URL || ''}/api/auth`;




export const register = async (data) => {


    const res = await fetch(`${BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), });


    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Registration failed');}


    return res.json();    };








export const login = async (data) => {
    const res = await fetch(`${BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),});



    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Login failed');
    }



    return res.json();  };
