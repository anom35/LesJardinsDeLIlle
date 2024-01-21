import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useTable } from 'react-table';
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import Message from "../components/Message"
import "../styles/administration.css"


export default function Administration({ setIsLoggedIn }) {

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    
    const [allUsers, setAllUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnCreateAdherent, setBtnCreateAdherent] = useState(false);
    const [listeAdherent, setListeAdherent] = useState(false);

    const [Error, setError] = useState("");
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
            } else { 
                setSuccessMessage("Adhérent créé avec succès !");
                setErrorMessage(false);
                resetForm();
            }
        } catch (error) {
            setError("Erreur lors de la création d'une fiche adhérent");
            setSuccessMessage("Erreur lors de la création !");
            setErrorMessage(true);
        }
    };

    const getAllAdherants = async () => {
        try {
            const response = await fetch('http://localhost:3513/get-all-users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });
            if (!response.ok) { throw new Error(`Erreur HTTP ${response.status}`); }
            setAllUsers(await response.json());
        } catch (error) {
            setError("Erreur lors de la création d'une fiche adhérent");
        }
    };

    //* affiche une table de tous les adhérents
    function AdherentsTable({ data }) {
        const columns = React.useMemo(
            () => [
                { Header: 'Inscription', accessor: 'date_inscription' },
                { Header: 'Nom', accessor: 'nom' },
                { Header: 'Prénom', accessor: 'prenom' },
                { Header: 'Adresse', accessor: 'adresse' },
                { Header: 'Téléphone', accessor: 'telephone' },
                { Header: 'Email', accessor: 'email' },
                { 
                    Header: 'Mot de passe', 
                    accessor: 'password',
                    className: 'custom-password-column'
                },
                { Header: 'Jardin', accessor: 'jardin' },
                { Header: 'Parcelle', accessor: 'parcelle' },
                { Header: 'Caution', accessor: 'caution' },
                { Header: 'Type de paiement', accessor: 'type_paiement' },
                { Header: 'Date fin d\'adhésion', accessor: 'date_fin' },
                { Header: 'Caution rendu', accessor: 'caution_rendu' },
            ],[]
        );
      
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
      
        return (
            <table {...getTableProps()} className="table">
                <thead className="table-header">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody  className="table-body" {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
      

    const resetForm = () => {
        setSelectedDate(today);
        setNom("");
        setPrenom("");
        setAdresse("");
        setTelephone("");
        setEmail("");
        setMotDePasse("");
        setCaution("");
        setTypePaiement("");
        setNumParcelle("");
        setFinInscription("");
        setCautionRendu("");
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
    };
    

    const activeCreateAdherant = () => {
        setBtnCreateAdherent(!btnCreateAdherent);
    }

    const activeListeAdherents = () => {
        setListeAdherent(!listeAdherent);
    }

    useEffect(() => {
        getAllAdherants();
        resetForm();
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
    }, [navigate]);


    return (
        <div>
            <Shaping>
                <Header />
                <div className="fc fdc aic admin-container">
                    <div className="boutons">
                        <button className="btn2" onClick={activeCreateAdherant}>Création adhérent</button>
                        <button className="btn2" onClick={activeListeAdherents}>Liste des adhérents</button>
                    </div>
                    <div className="container-section">               
                        <div className={btnCreateAdherent ? "ajout-jardinier show-on" : "ajout-jardinier show-off"}>
                            <h3 className='fc'>Créer une fiche adhérent</h3>
                            <form className="create-user" action="#" autoComplete="off">
                                <div className="form-container">
                                    <div className="form1">
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
                                        <label>Mot de passe (admin)</label>
                                        <input type="password" placeholder="<PASSWORD>"  value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
                                    </div>
                                    <div className="form2">
                                        <label className='choix-jardin'>Jardin</label>
                                        <select value={selectedJardin} onChange={(e) => setSelectedJardin(e.target.value)}>
                                            <option value="Chaponerais">Chaperonnerais</option>
                                            <option value="Piconnerie">Piconnerie</option>
                                        </select>
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
                                    </div>
                                </div>

                                <button type="button" onClick={createAdherant}>Créer adhérent</button>

                                {!errorMessage && (
                                    (successMessage && <Message message={successMessage} erreur={false} />)
                                )}

                                {errorMessage && (
                                    (successMessage && <Message message={successMessage} erreur={true} />)
                                )}
                            </form>
                        </div>
                        <div className={listeAdherent ? "liste-adherents show-on" : "liste-adherents show-off" }>
                            <AdherentsTable data={allUsers} />
                        </div>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
