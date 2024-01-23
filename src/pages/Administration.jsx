import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTable } from 'react-table';
import styled from "styled-components";
import { reformatDate } from '../components/fonctions';
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import Message from "../components/Message"
import "../styles/administration.css"
// import { computeHeadingLevel } from '@testing-library/react';


export default function Administration({ setIsLoggedIn }) {

    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    
    const [allUsers, setAllUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [btnCreateAdherent, setBtnCreateAdherent] = useState(false);
    const [listeAdherent, setListeAdherent] = useState(false);
    const [filterJardin, setFilterJardin] = useState("");
    const [filterNom, setFilterNom] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);

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



    // Filtrer par jardin
    const handleJardinChange = (e) => {
        setFilterJardin(e.target.value); // Remplacez par la valeur appropriée
        setFilterNom(""); // Réinitialiser l'autre filtre
    };

    // Filtrer par nom
    const filterByName = (nom) => {
        setFilterNom(nom);
        setFilterJardin(""); // Réinitialiser l'autre filtre
    };

    // Annuler les filtres
    const clearFilters = () => {
        setFilterJardin("");
        setFilterNom("");
    };

    const filteredData = allUsers.filter(user => {
        return (!filterJardin || user.jardin === filterJardin) && (!filterNom || user.nom.includes(filterNom));
    });

    const handleEdit = async (e) => {
    }

    const handleDelete = async (e) => {
    }

    const Styles = styled.div`
        padding: 1rem;

        table {
            border-spacing: 0;
            border: 1px solid black;
            tr {
                :last-child { td { border-bottom: 0; }}
            }
            th,
            td {
                margin: 0;
                padding: 0.5rem;
                border-bottom: 1px solid black;
                border-right: 1px solid black;
                :last-child {
                    border-right: 0;
                }
            }
        }
        `;

    //* affiche une table de tous les adhérents
    function AdherentsTable({ data, selectedRow = null }) {
        const columns = React.useMemo(
            () => [
                { 
                    Header: 'Inscription', 
                    accessor: 'date_inscription',
                    Cell: ({ cell }) => (<div>{cell.value ? reformatDate(cell.value) : ''}</div>)
                },
                { Header: 'Nom', accessor: 'nom' },
                { Header: 'Prénom', accessor: 'prenom' },
                { Header: 'Adresse', accessor: 'adresse' },
                { Header: 'Téléphone', accessor: 'telephone' },
                { Header: 'Email', accessor: 'email' },
                { 
                    Header: 'Mot de passe', 
                    accessor: 'password', 
                    Cell: ({ cell }) => (<div style={{ width: '100px', overflow: 'hidden'  }}>{cell.value}</div>)
                },
                { Header: 'Jardin', accessor: 'jardin' },
                { Header: 'Parcelle', accessor: 'parcelle' },
                { Header: 'Caution', accessor: 'caution' },
                { 
                    Header: 'Type de paiement', 
                    accessor: 'type_paiement',
                    Cell: ({ cell }) => (<div style={{ width: '130px', overflow: 'hidden' }}>{cell.value}</div>)

                },
                { 
                    Header: 'Date fin d\'adhésion', 
                    accessor: 'date_fin',
                    Cell: ({ cell }) => (<div>{cell.value ? reformatDate(cell.value) : ''}</div>)
                },
                { 
                    Header: 'Caution rendu', 
                    accessor: 'caution_rendu',
                    Cell: ({ cell }) => (<div style={{ width: '50px', overflow: 'hidden' }}>{cell.value}</div>)

                },
            ],[]
        );
      
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
      
        const getRowProps = (row) => {
            const backgroundColor = selectedRow === row.index ? "orange" : null;
            return {
                onClick: () => {
                    if (selectedRow === row.index) {
                        setSelectedRow(null);
                    } else {
                        setSelectedRow(row.index);
                    }
                },
                style: {
                    backgroundColor
                }
            };
            const {
                getTableProps,
                getTableBodyProps,
                headerGroups,
                rows,
                prepareRow
            } = useTable({ columns, data, getRowProps });
        };
        

        return (
            <div className="container-table">
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
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr  {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>);
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
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
        setListeAdherent(false);
    }

    const activeListeAdherents = () => {
        setListeAdherent(!listeAdherent);
        setBtnCreateAdherent(false);
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
        return () => { window.removeEventListener('beforeunload', handleBeforeUnload); };
    }, [navigate]);


    return (
        <div>
            <Shaping>
                <Header />
                <div className="fc fdc aic admin-container">
                    <div className="boutons">
                        <button className="btn2" onClick={activeListeAdherents}>Liste des adhérents</button>
                        <button className="btn2" onClick={activeCreateAdherant}>Création adhérent</button>
                        <button className="btn2" onClick={activeCreateAdherant}>Modification adhérent</button>
                        <button className="btn2" onClick={activeCreateAdherant}>Suppression adhérent</button>
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
                            <h4 className='fc'>Liste des adhérents</h4>
                            <select className='choix-jardin' value={filterJardin} onChange={handleJardinChange}>
                                <option value="">Tous les Jardins</option>
                                <option value="Chaperonnerais">Chaperonnerais</option>
                                <option value="Piconnerie">Piconnerie</option>
                            </select>
                            <button className='btn3 annule-filtre' onClick={clearFilters}>Annuler les Filtres</button>
                            <label className='label-search'>Recherche par Nom
                                <input className='search-filter' type="text" placeholder="Nom" onChange={(e) => filterByName(e.target.value)} />
                            </label>
                            <AdherentsTable data={filteredData} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
                            <button
                                className='btn3'
                                onClick={() => handleEdit(selectedRow)}
                                disabled={!selectedRow}
                            >
                                Modifier
                            </button>
                            <button
                                className='btn3'
                                onClick={() => handleDelete(selectedRow)}
                                disabled={!selectedRow}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
