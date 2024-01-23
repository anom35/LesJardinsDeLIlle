import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { reformatDate } from '../components/fonctions';
import styled from "styled-components";
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import { getAllAdherants, createAdherant } from '../components/Reseaux';
import Message from "../components/Message"
import "../styles/administration.css"



const TableContainer = styled.div`
    padding: 10px 0;
    width: 100%;
    height: calc(100vh - 450px);
    overflow-x: auto;
    overflow-y: auto;
`;

const Table = styled.table`
    width: 100vw;
    border-collapse: collapse;
    font-size: 12px;
    background-color: var(--bg-grid); 
    color: white;

    th, td, tr {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: var(--bg-grid); 
        color: white;
    }
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-grid);
        z-index: -1;
    }
`;

export default function Administration2({ setIsLoggedIn }) {

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    
    const [allUsers, setAllUsers] = useState([]);
    const [countUsers, setCountUsers] = useState(0);
    const [Error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnCreateAdherent, setBtnCreateAdherent] = useState(false);
    const [filterJardin, setFilterJardin] = useState("");
    const [filterNom, setFilterNom] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

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


    // Filtrer par jardin
    const handleJardinChange = (e) => {
        setFilterJardin(e.target.value);
        setFilterNom(""); 
    };

    
    // Annuler les filtres
    const clearFilters = () => {
        setFilterJardin("");
        setFilterNom("");
    };
    
    const handleEdit = async (e) => {
    }
    
    const handleDelete = async (e) => {
    }
    
    
    const filteredData = allUsers.filter(user => {
        return (!filterJardin || user.jardin === filterJardin) && (!filterNom || user.nom.toLowerCase().includes(filterNom));
    });
    
    
    // Filtrer par nom
    const filterByName = (nom) => {
        setFilterNom(nom.toLowerCase());
        setFilterJardin("");
    };
    

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

    const activeCreateAdherant = () => { setBtnCreateAdherent(!btnCreateAdherent); }
    const activeListeAdherents = () => { setBtnCreateAdherent(false); }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function fetchData() {
            const { allUsers, nbreEnregistrements, errorMessage } = await getAllAdherants();
            setAllUsers(allUsers);
            setCountUsers(nbreEnregistrements);
            setErrorMessage(errorMessage);
        }
        fetchData();
    }, []);


    return (
        <>
            <Shaping>
                <Header />
                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date d'inscription</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Adresse</th>
                                <th>Téléphone</th>
                                <th>Email</th>
                                <th>Jardin</th>
                                <th>Parcelle</th>
                                <th>Caution</th>
                                <th>Type de paiement</th>
                                <th>Date de fin</th>
                                <th>Caution rendu</th>
                                <th>Mot de passe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((user, index) => (
                                   <tr key={index}>
                                    <td>{reformatDate(user.date_inscription)}</td>
                                    <td>{user.nom}</td>
                                    <td>{user.prenom}</td>
                                    <td>{user.adresse}</td>
                                    <td>{user.telephone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.jardin}</td>
                                    <td>{user.parcelle}</td>
                                    <td>{user.caution}</td>
                                    <td>{user.type_paiement}</td>
                                    <td>{user.date_fin}</td>
                                    <td>{user.caution_rendu}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>


                {/* Affiche la fenêtre modal de la fiche adhérent */}
                {showModal && (
                    <div className="modal2">
                        <div className="modal-content2">
                            <span className="close-button2" onClick={closeModal}>&times;</span>
                            <div className="container-section">               
                                <h3 className='fc'>Créer une fiche adhérent</h3>
                                <form className="create-user" action="#" autoComplete="off">
                                    <div className="f form-container">

                                        <div className="form1">

                                            <label>Date d'inscription</label>
                                            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>

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
                                            <input type="date" value={fin_inscription} placeholder='' onChange={(e) => setFinInscription(e.target.value)}/>

                                            <label>Caution rendu</label>
                                            <input type="text" placeholder="50€" value={cautionRendu} onChange={(e) => setCautionRendu(e.target.value)} />
                                        </div>

                                    </div>

                                    <button type="button" onClick={createAdherant}>Créer adhérent</button>

                                    {!errorMessage && ((successMessage && <Message message={successMessage} erreur={false} />))}
                                    {errorMessage && ((successMessage && <Message message={successMessage} erreur={true} />))}
                                </form>

                            </div>
                        </div>
                    </div>
                )}
                {/* End modal */}



                <div className="f controlPanel">
                    <div className='f'>
                        <label className='label-search'>Recherche par Nom :
                            <input className='search-filter' type="text" placeholder="Nom" onChange={(e) => filterByName(e.target.value)} />
                        </label>
                        <label className="label-jardin f fdc">Tri par Jardin :
                            <select className='choix-jardin' value={filterJardin} onChange={handleJardinChange}>
                                <option value="">Tous les Jardins</option>
                                <option value="Chaperonnerais">Chaperonnerais</option>
                                <option value="Piconnerie">Piconnerie</option>
                            </select>
                        </label>
                    </div>

                    <div className="f fdc container-button">
                        <p className='fc'>Adhérents</p>
                        <div className='f groupe-button'>
                            <button className='btn3' onClick={openModal}>
                                Créer
                            </button>                    
                            <button className='btn3' onClick={() => handleEdit(selectedRow)}>
                                Modifier
                            </button>
                            <button className='btn3' onClick={() => handleDelete(selectedRow)}>
                                Supprimer
                            </button>
                        </div>
                    </div>

                </div>
            </Shaping>
            <Footer />
        </>
    )
}
