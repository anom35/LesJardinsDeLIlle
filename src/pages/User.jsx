import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/user.css"

export default function AuthModal({ show, isLoggedIn, setIsLoggedIn }) {
    const [email2, setEmail2] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:3513/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: email2, password: password2 })
            })
               
            if (!response.ok) { throw new Error(`Erreur HTTP ${response.status}`); }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            setError("");
            setIsLoggedIn(true);

        } 
        catch (error) { setError("Erreur sur l'ensemble Email et Mot de passe"); }
    };
    
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/administration');
        }
    }, [isLoggedIn, navigate]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const closeUserModal = () => { navigate('/'); }

    return (
        <div className={`auth-modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={closeUserModal}>&times;</span>
                <h2 className='fc'>Connexion</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Entrez votre email"
                        value={email2}
                        onChange={(e) => setEmail2(e.target.value)}
                        autoComplete="username"
                    />
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button type="submit">Se connecter</button>
                </form>
             </div>
        </div>
    );
};
