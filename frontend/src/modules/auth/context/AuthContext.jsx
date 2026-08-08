import { createContext, useContext, useState, useEffect } from 'react';



const AuthContext = createContext(null);




export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);




    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) { setUser(JSON.parse(stored)); }
        setLoaded(true);}, []);





    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  };




    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); };




    return (
        <AuthContext.Provider value={{ user, loaded, login, logout }}>
            {children}
        </AuthContext.Provider> ); };

export const useAuth = () => useContext(AuthContext);
