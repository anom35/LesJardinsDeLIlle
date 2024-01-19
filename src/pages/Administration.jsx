import React, { useState } from 'react'
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import "../styles/administration.css"


export default function Administration() {

    const today = new Date().toISOString().split('T')[0];
    
    const [Error, setError] = useState("");
    const [tableUsers, setTableUsers] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedJardin, setSelectedJardin] = useState("Chaponerais");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [caution, setCaution] = useState("");
    const [typePaiement, setTypePaiement] = useState("");

    const createAdherant = async () => {
        try {
            const response = await fetch('http://localhost:3513/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    date_inscription: selectedDate,
                    nom: nom,
                    prenom: prenom,
                    adresse: adresse,
                    telephone: telephone,
                    email: email,
                    password: motDePasse,
                    jardin: selectedJardin,
                    caution: caution,
                    type_paiement: typePaiement,
                })
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            setTableUsers(await response.json());
            console.log(tableUsers);

        } catch (error) {
            setError("Erreur lors de la création d'une fiche adhérent");
        }
    };

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
                            <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                            <label>Prénom</label>
                            <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                            <label>Adresse</label>
                            <input type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)}/>
                            <label>Téléphone</label>
                            <input type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                            <label>Email</label>
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label>Mot de passe</label>
                            <input type="password" placeholder="<PASSWORD>"  value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
                            <label className='choix-jardin'>Jardin :&nbsp;
                                <select value={selectedJardin} onChange={(e) => setSelectedJardin(e.target.value)}>
                                    <option value="Chaponerais">Chaperonnerais</option>
                                    <option value="Piconnerie">Piconnerie</option>
                                </select>
                            </label>
                            <label>Caution</label>
                            <input type="text" placeholder="25€" value={caution} onChange={(e) => setCaution(e.target.value)} />
                            <label>Type de paiement</label>
                            <input type="text" placeholder="Type de paiement" value={typePaiement} onChange={(e) => setTypePaiement(e.target.value)}/>


                            <button type="button" onClick={createAdherant}>Créer adhérent</button>
                        </form>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
