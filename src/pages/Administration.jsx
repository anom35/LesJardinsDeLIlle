import React, { useState } from 'react'
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import "../styles/administration.css"


export default function Administration() {

    const today = new Date().toISOString().split('T')[0];
    
    const [tableUsers, setTableUsers] = useState([])
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedJardin, setSelectedJardin] = useState("Chaponerais");

    // const handleLogin = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3513/get-all-users', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             // body: JSON.stringify({
    //             //     email: email,
    //             //     password: password
    //             // })
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Erreur HTTP ${response.status}`);
    //         }

    //         setTableUsers(await response.json());
    //         console.log(tableUsers);

    //     } catch (error) {
    //         // setError("Erreur lors de la ");
    //     }
    // };

    return (
        <div>
            <Shaping>
                <Header />
                <div className="fc fdc aic admin-container">
                    <h2>Page d'Administration</h2>
                    <div className='ajout-jardinier'>
                        <h3>Créer une fiche adhérent</h3>
                        <form className="create-user" action="#">
                            <label>Date d'inscription</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                            <label>Nom</label>
                            <input type="text" placeholder="Nom" />
                            <label>Prénom</label>
                            <input type="text" placeholder="Prénom" />
                            <label>Adresse</label>
                            <input type="text" placeholder="Adresse" />
                            <label>Téléphone</label>
                            <input type="text" placeholder="Téléphone" />
                            <label>Email</label>
                            <input type="text" placeholder="Email" />
                            <label>Mot de passe</label>
                            <input type="password" placeholder="<PASSWORD>" />
                            <label className='choix-jardin'>Jardin :&nbsp;
                                <select value={selectedJardin} onChange={(e) => setSelectedJardin(e.target.value)}>
                                    <option value="Chaponerais">Chaponerais</option>
                                    <option value="Piconnerie">Piconnerie</option>
                                </select>
                            </label>
                            <label>Caution</label>
                            <input type="text" placeholder="Caution" />
                            <label>Type de paiement</label>
                            <input type="text" placeholder="Type de paiement" />


                            <button type="submit">Créer adhérent</button>
                        </form>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
