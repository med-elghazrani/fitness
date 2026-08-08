import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';



const RegisterPage = () => {
    const [formData, setFormData] = useState({
        nom: '', prenom: '', email: '', motDePasse: '',
        anneeNaissance: '', sex: 'MALE', poids: '', taille: ''
    });



    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur(null);
        try {
            const user = await registerApi({
                ...formData,
                anneeNaissance: parseInt(formData.anneeNaissance),
                poids: parseFloat(formData.poids),
                taille: parseFloat(formData.taille),
            });
            login(user);
            navigate('/');
        } catch (err) {
            setErreur(err.message);
        }
        setLoading(false);
    };




    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-200 to-base-100 py-12">
            <div className="card w-full max-w-md bg-base-100 shadow-2xl border-4 border-primary">
                <div className="card-body">
                    <h2 className="card-title text-3xl font-black mb-6 text-primary">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input name="prenom" placeholder="First name" required value={formData.prenom} onChange={handleChange} className="input input-bordered w-full" />
                        <input name="nom" placeholder="Last name" required value={formData.nom} onChange={handleChange} className="input input-bordered w-full" />
                        <input type="email" name="email" placeholder="Email" required
                            value={formData.email} onChange={handleChange} className="input input-bordered w-full" />
                        <input type="password" name="motDePasse" placeholder="Password" required
                            value={formData.motDePasse} onChange={handleChange} className="input input-bordered w-full" />
                        <input type="number" name="anneeNaissance" placeholder="Birth year" required value={formData.anneeNaissance} onChange={handleChange}
                            className="input input-bordered w-full" min="1900" max={new Date().getFullYear()} />
                        <select name="sex" value={formData.sex} onChange={handleChange} className="select select-bordered w-full">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                        <input type="number" name="poids" placeholder="Weight (kg)" required
                            value={formData.poids} onChange={handleChange} className="input input-bordered w-full" step="0.1" />
                        <input type="number" name="taille" placeholder="Height (m)" required value={formData.taille} onChange={handleChange} className="input input-bordered w-full" step="0.01" />
                        {erreur ? <p className="text-error font-bold">{erreur}</p> : null}
                        <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full text-xl font-black">
                            {loading ? <span className="loading loading-spinner"></span> : 'Register'}
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account? <Link to="/login" className="link link-primary font-bold">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
