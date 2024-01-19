import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import "../styles/administration.css"


export default function Administration({ setIsLoggedIn }) {

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    
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
    const [numParcelle, setNumParcelle] = useState("");
    const [fin_inscription, setFinInscription] = useState("");
    const [cautionRendu, setCautionRendu] = useState("");

    const createAdherant = async () => {
        try {
            const response = await fetch('http://localhost:3513/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                },
                body: JSON.stringify({
                    password: motDePasse,
                    email: email,
                    nom: nom,
                    prenom: prenom,
                    date_inscription: selectedDate,
                    jardin: selectedJardin,
                    parcelle: numParcelle, 
                    adresse: adresse,
                    telephone: telephone,
                    date_fin: fin_inscription, 
                    caution: caution,
                    type_paiement: typePaiement,
                    caution_rendu: cautionRendu 
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


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };
    
    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('authToken');
        };

        const handleRouteChange = () => {
            handleLogout();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

        const unlisten = navigate.listen(handleRouteChange);
        return () => {
            unlisten(); 
        };
    }, [navigate]);


    return (
        <div>
            <Shaping>
                <Header />
                <div className="fc fdc aic admin-container">
                    {/* <h2>Page d'Administration</h2> */}
                    <div className='ajout-jardinier'>
                        <h3 className='fc'>Créer une fiche adhérent</h3>
                        <form className="create-user" action="#" autoComplete="off">
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
                            <label>Parcelle(s)</label>
                            <input type="text" placeholder="18a" value={numParcelle} onChange={(e) => setNumParcelle(e.target.value)} />
                            <label>Caution</label>
                            <input type="text" placeholder="50€" value={caution} onChange={(e) => setCaution(e.target.value)} />
                            <label>Type de paiement</label>
                            <input type="text" placeholder="Type de paiement" value={typePaiement} onChange={(e) => setTypePaiement(e.target.value)}/>

                            <label>Date de fin adhérent</label>
                            <input
                                type="date"
                                value={fin_inscription}
                                placeholder=''
                                onChange={(e) => setFinInscription(e.target.value)}
                            />

                            <label>Caution rendu</label>
                            <input type="text" placeholder="50€" value={cautionRendu} onChange={(e) => setCautionRendu(e.target.value)} />


                            <label>Date de rendu de la caution</label>
                            <input
                                type="date"
                                value={cautionRendu}
                                placeholder=''
                                onChange={(e) => setCautionRendu(e.target.value)}
                            />


                            <button type="button" onClick={createAdherant}>Créer adhérent</button>
                        </form>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
