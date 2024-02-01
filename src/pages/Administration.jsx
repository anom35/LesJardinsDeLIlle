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
  const [selectedModifUser, setSelectedModifUser] = useState(false);
  const [selectedUserForModification, setSelectedUserForModification] = useState(false);
  const [statusBtn, setStatusBtn] = useState(1);
  const [titre, setTitre] = useState("Créer un adhérent");
  const [colorTitre, setColorTitre] = useState("orange");
  const [isCreateFiche, setIsCreateFiche] = useState(false);
  
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
  const [key, setKey] = useState(0);
  const [keyMail, setKeyMail] = useState(0);
  const [keyPassword, setKeyPassword] = useState(0);

  useEffect(() => {
    setEmail("");
    setMotDePasse("");
  }, []);

  
  useEffect(() => {
    if (!isCreateFiche) {
      async function fetchData() {
        const { allUsers, nbreEnregistrements, errorMessage } = await getAllAdherants();
        setAllUsers(allUsers);
        setCountUsers(nbreEnregistrements);
        setErrorMessage(errorMessage);
        
          if (selectedUserForModification === false && allUsers.length > 0) {
              setSelectedUserForModification(allUsers[0].nom + " " + allUsers[0].prenom);
          
              const selectedUserData = allUsers[0];
              setSelectedDate(selectedUserData.date_inscription);
              setNom(selectedUserData.nom);
              setPrenom(selectedUserData.prenom);
              setAdresse(selectedUserData.adresse);
              setTelephone(selectedUserData.telephone);
              setEmail(selectedUserData.email);
              setMotDePasse(selectedUserData.password);
              setCaution(selectedUserData.caution);
              setTypePaiement(selectedUserData.type_paiement);
              setNumParcelle(selectedUserData.parcelle);
              if (selectedUserData.fin_inscription) {
                  setFinInscription(selectedUserData.fin_inscription);
              } else {
                  setFinInscription("");
              }
              setCautionRendu(selectedUserData.caution_rendu);
          }
      }
      fetchData();
    }    
    setIsCreateFiche(false);
  }, [isCreateFiche]);
  
  useEffect(() => {
    if (isCreateFiche) {
      setKey(prevKey => {
        const newKey = prevKey + 1;
        setKeyMail("mailForm" + newKey);
        setKeyPassword("password" + newKey);
        return newKey;
      });
    }
  }, [isCreateFiche]);
      
  const resetForm = () => {
    setSelectedDate(reformatDate(today)); //.split("T")[0]);
    setNom("");
    setPrenom("");
    setAdresse("");
    setTelephone("");
    setCaution("");
    setTypePaiement("");
    setNumParcelle("");
    setFinInscription("");
    setCautionRendu("");
    setEmail("");
    setMotDePasse("");
  }
  // Filtrer par jardin
  const handleJardinChange = (e) => {
    setFilterJardin(e.target.value);
    setFilterNom(""); 
  };

  // Annuler les filtres
  // const clearFilters = () => {
  //   setFilterJardin("");
  //   setFilterNom("");
  // };
  
  // Lorsque l'utilisateur clique sur le bouton Creer un adhérent
  const handleCreate = () => {
    setSelectedModifUser(false);
    setStatusBtn(1);
    setTitre("Créer un adhérent");
    setColorTitre("orange");
    setIsCreateFiche(true);
    resetForm();
    openModal();
  }

  // Lorsque l'utilisateur clique sur le bouton Modifier un adhérent
  const handleEdit = () => {
    setSelectedModifUser(true);
    setStatusBtn(2);
    setTitre("Modifier un adhérent");
    setColorTitre("var(--bg-btn-hover2)");
    openModal();
  }
  
  // Lorsque l'utilisateur clique sur le bouton Supprimer un adhérent
  const handleDelete = () => {
    setSelectedModifUser(true);
    setStatusBtn(3);
    setTitre("Supprimer un adhérent");
    setColorTitre("red");
    openModal();
  }
  
  
  const filteredData = allUsers.filter(user => {
    return (!filterJardin || user.jardin === filterJardin) && (!filterNom || user.nom.toLowerCase().includes(filterNom));
  });
  
  
  // Filtrer par nom
  const filterByName = (nom) => {
    setFilterNom(nom.toLowerCase());
    setFilterJardin("");
  };
  


  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };


  const handleAdherentChange = (selectedAdherent) => {
    const [selectedNom, selectedPrenom] = selectedAdherent.split(" ");
    const selectedUser = allUsers.find((user) => user.nom === selectedNom && user.prenom === selectedPrenom);
    if (selectedUser) {
      if (reformatDate(selectedUser.date_inscription) !=="01/01/1970") {
        setSelectedDate(reformatDate(selectedUser.date_inscription));
      } else {
        setSelectedDate("");
      }

      setNom(selectedUser.nom);
      setPrenom(selectedUser.prenom);
      setAdresse(selectedUser.adresse);
      setTelephone(selectedUser.telephone);
      setEmail(selectedUser.email);
      setMotDePasse(selectedUser.password);
      setCaution(selectedUser.caution);
      setTypePaiement(selectedUser.type_paiement);
      setNumParcelle(selectedUser.parcelle);
      if (selectedUser.fin_inscription) {
        setFinInscription(selectedUser.fin_inscription);
      } else {
        setFinInscription("");
      }
      setCautionRendu(selectedUser.caution_rendu);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const formatDateForInput = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

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
                      <h3 className='fc' style={{color: colorTitre}}>{titre}</h3>
                      <form className="create-user" action="#">
                        <div className="f form-container">

                          <div className="form1">
                            {selectedModifUser && (
                              <div>
                                <label>Adhérent :</label>
                                  <select value={selectedUserForModification} onChange={(e) => {
                                    setSelectedUserForModification(e.target.value);
                                    handleAdherentChange(e.target.value);
                                  }}>
                                  {allUsers.map((user, index) => (
                                    <option key={index} value={user.nom + " " + user.prenom}>{user.nom + " " + user.prenom}</option>
                                  ))}
                                </select>
                              </div>
                            )}

                            <label form='date'>Date d'inscription</label>
                            <input type="text" name='date' value={selectedDate} onChange={(e) => reformatDate(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='nom'>Nom</label>
                            <input type="text" name='nom' placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='prenom'>Prénom</label>
                            <input type="text" name='prenom' placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} disabled={statusBtn === 3 ? true : false} />

                            <label form='adresse'>Adresse</label>
                            <input type="text" name='adresse' placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='telephone'>Téléphone</label>
                            <input type="text" name='telephone' placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='email'>Email</label>
                            <input 
                              name='email'
                              key={keyMail}
                              type="text"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={statusBtn === 3? true : false}
                            />
                          </div>

                          <div className="form2">
                            <label form='password'>Mot de passe</label>
                            <input 
                              name='password'
                              key={keyPassword}
                              type="text" 
                              placeholder="<PASSWORD>"  
                              value={motDePasse} 
                              onChange={(e) => setMotDePasse(e.target.value)}
                              disabled={statusBtn === 3 ? true : false}
                            />

                            <label form='choix_jardin' className='choix-jardin'>Jardin</label>
                            <select value={selectedJardin} name='choix_jardin' onChange={(e) => setSelectedJardin(e.target.value)} disabled={statusBtn === 3 ? true : false}>
                              <option value="Chaponerais">Chaperonnerais</option>
                              <option value="Piconnerie">Piconnerie</option>
                            </select>

                            <label form='parcelle'>Parcelle(s)</label>
                            <input type="text" name='parcelle' placeholder="18a" value={numParcelle} onChange={(e) => setNumParcelle(e.target.value)} disabled={statusBtn === 3 ? true : false} />

                            <label form='caution'>Caution</label>
                            <input type="text" name='caution' placeholder="50€" value={caution} onChange={(e) => setCaution(e.target.value)} disabled={statusBtn === 3 ? true : false} />

                            <label form='type_paiement'>Type de paiement</label>
                            <input type="text" name='type_paiement' placeholder="Type de paiement" value={typePaiement} onChange={(e) => setTypePaiement(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='date_fin'>Date de fin adhérent</label>
                            <input type="text" name='date_fin' value={fin_inscription} placeholder='' onChange={(e) => setFinInscription(formatDateForInput(reformatDate(e.target.value)))} disabled={statusBtn === 3 ? true : false}/>

                            <label form='caution-rendu'>Caution rendu</label>
                            <input type="text" name='caution-rendu' placeholder="50€" value={cautionRendu} onChange={(e) => setCautionRendu(e.target.value)} disabled={statusBtn === 3 ? true : false} />
                          </div>
                        </div>

                        <button type="button" onClick={createAdherant}>Confirmer</button>

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
              <select className='choix-jardin2' value={filterJardin} onChange={handleJardinChange}>
                <option value="">Tous les Jardins</option>
                <option value="Chaperonnerais">Chaperonnerais</option>
                <option value="Piconnerie">Piconnerie</option>
              </select>
            </label>
          </div>
          <div className="f fdc container-button">
            <p className='fc'>Adhérents</p>
            <div className='f groupe-button'>
              <button className='btn3' onClick={() => handleCreate()}>Créer</button>                    
              <button className='btn3' onClick={() => handleEdit()}>Modifier</button>
              <button className='btn3' onClick={() => handleDelete(selectedRow)}>Supprimer</button>
            </div>
          </div>
        </div>
    </Shaping>
    <Footer />
  </>
  )
}