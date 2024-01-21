import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/user.css"

export default function AuthModal({ show, isLoggedIn, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3513/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email: email, password: password })
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
    }, [isLoggedIn]);

    const closeUserModal = () => { navigate('/'); }

    return (
        <div className={`auth-modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={closeUserModal}>&times;</span>
                <h2 className='fc'>Connexion</h2>
                {error && <div className="error">{error}</div>}
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Mot de passe</label>
                <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Se connecter</button>
             </div>
        </div>
    );
};
