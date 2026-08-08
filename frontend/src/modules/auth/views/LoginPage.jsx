import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';




const LoginPage = () => {


    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur(null);



        try {
            const user = await loginApi({ email, motDePasse });
            login(user);
            navigate('/');
        } catch (err) {  setErreur(err.message); } 
        finally {  setLoading(false);} };




        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
                <div className="card w-full max-w-md bg-base-100 shadow-2xl border-4 border-primary">
                    <div className="card-body">
                        <h2 className="card-title text-3xl font-black mb-6 text-primary">Log In</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input input-bordered w-full text-lg" />
                            <input
                                type="password" placeholder="Password" required
                                value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}
                                className="input input-bordered w-full text-lg" />
                            {erreur ? <p className="text-error font-bold">{erreur}</p> : null}
                            <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full text-xl font-black">
                                {loading ? <span className="loading loading-spinner"></span> : 'Log In'}
                            </button>
                        </form>
                        <p className="text-center mt-4">
                            No account yet? <Link to="/register" className="link link-primary font-bold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    };
    


export default LoginPage;
