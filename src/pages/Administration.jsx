import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import { getAllAdherants, createAdherant, modifyAdherant, deleteAdherant, modifyParams, getParams } from '../components/Reseaux';
import imprimante from "../assets/images/imprimante.webp"
import "../styles/administration.css"



const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 450px);
  overflow-x: auto;
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100vw;
  border-collapse: collapse;
  font-size: 12px;
  background-color: var(--bg-cell); 
  color: white;

  th, td, tr {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: var(--bg-grid); 
    border-bottom: 2px solid white;
    color: white;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg-cell);
    z-index: -1;
  }
`;

export default function Administration2({ setIsLoggedIn }) {

  const today = new Date().toLocaleDateString('fr-FR');
  const navigate = useNavigate();
  
  const [allUsers, setAllUsers] = useState([]);
  const [filterJardin, setFilterJardin] = useState("");
  const [filterNom, setFilterNom] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedModifUser, setSelectedModifUser] = useState(false);
  const [selectedUserForModification, setSelectedUserForModification] = useState(false);
  const [statusBtn, setStatusBtn] = useState(1);
  const [titre, setTitre] = useState("Créer un adhérent");
  const [colorTitre, setColorTitre] = useState("orange");
  const [isCreateFiche, setIsCreateFiche] = useState(false);
  const [affMsg, setAffMsg] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedJardin, setSelectedJardin] = useState("Chaperonnerais");
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



  function reformatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
  }

  useEffect(() => {
    if (!isCreateFiche) {
      async function fetchData() {
        setAllUsers(await getAllAdherants());
        
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
  }, [isCreateFiche, selectedUserForModification]);
  
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

  useEffect(() => {
    async function fetchData() {
      const params = await getParams();
      setAffMsg(params.affiche_message === 1);
      setTextMessage(params.message);
    }
    fetchData();
  }, []);

  const resetForm = () => {
    setSelectedDate(today);
    setNom("");
    setPrenom("");
    setAdresse("");
    setTelephone("");
    setCaution("");
    setTypePaiement("");
    setNumParcelle("");
    setFinInscription("          ");
    setCautionRendu("");
    setEmail("");
    setMotDePasse("");
  }


  // Filtrer par jardin
  const handleJardinChange = (e) => {
    setFilterJardin(e.target.value);
    setFilterNom(""); 
  };

  
  
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
  
  
  // Filtrer par nom
  const filterByName = (nom) => {
    setFilterNom(nom.toLowerCase());
    setFilterJardin("");
  };
  

// Lorsque l'utilisateur clique sur un choix de menu, ca supprime le Token, met l'identification à false, et redirige vers la page d'accueil
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };


  const handleAdherentChange = (selectedAdherent) => {
    const [selectedNom, selectedPrenom] = selectedAdherent.split(" ");
    const selectedUser = allUsers.find((user) => user.nom === selectedNom && user.prenom === selectedPrenom);
    if (selectedUser) {
      if (selectedUser.date_inscription !=="01/01/1970") {
        setSelectedDate(selectedUser.date_inscription);
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
  


  const handleConfirmClick = async () => {
    const enregistrement = { nom, prenom, adresse, telephone, email, motDePasse, selectedDate, selectedJardin, numParcelle, fin_inscription, caution, typePaiement, cautionRendu };
  
    if (statusBtn === 1) await createAdherant(enregistrement);
    else if (statusBtn === 2) await modifyAdherant(enregistrement);
    else if (statusBtn === 3) await deleteAdherant(email);
    
    closeModal();
    setAllUsers(await getAllAdherants());
  };


  const filteredAndSortedData = useMemo(() => {
    const filtered = allUsers.filter(user => {
      return (!filterJardin || user.jardin === filterJardin) && (!filterNom || user.nom.toLowerCase().includes(filterNom.toLowerCase()));
    });
    const sorted = filtered.sort((a, b) => a.nom.localeCompare(b.nom));
    return sorted;
  }, [allUsers, filterJardin, filterNom]);


  const saveParams = () => {
    modifyParams(affMsg, textMessage);
  };


  function printTable() {
    var divToPrint = document.getElementById('Table');
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();

    const printStyles = `
      <style>
        @page {
          size: landscape;
          margin: 10mm;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 10pt;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 5px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .password-column {
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>
    `;

    newWin.document.write('<html><head>' + printStyles + '</head><body onload="window.print()">' + divToPrint.outerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function() { newWin.close(); }, 10);
}

  
  

  return (
      <>
          <Shaping>
              <Header />
              <TableContainer>
                  <Table id='Table'>
                      <thead className="sticky-header">
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
                          {filteredAndSortedData.map((user, index) => (
                                  <tr key={index}>
                                  <td>{user.date_inscription}</td>
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
                                  <td className="password-column">{user.password}</td>
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
                            <input type="text" name='date' value={reformatDate(selectedDate)} onChange={(e) => setSelectedDate(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

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
                              <option value="Chaperonnerais">Chaperonnerais</option>
                              <option value="Piconnerie">Piconnerie</option>
                            </select>

                            <label form='parcelle'>Parcelle(s)</label>
                            <input type="text" name='parcelle' placeholder="18a" value={numParcelle} onChange={(e) => setNumParcelle(e.target.value)} disabled={statusBtn === 3 ? true : false} />

                            <label form='caution'>Caution</label>
                            <input type="text" name='caution' placeholder="50€" value={caution} onChange={(e) => setCaution(e.target.value)} disabled={statusBtn === 3 ? true : false} />

                            <label form='type_paiement'>Type de paiement</label>
                            <input type="text" name='type_paiement' placeholder="Type de paiement" value={(typePaiement)} onChange={(e) => setTypePaiement(e.target.value)} disabled={statusBtn === 3 ? true : false}/>

                            <label form='date_fin'>Date de fin adhérent</label>
                            <input 
                              type="text" 
                              name='date_fin' 
                              // value={reformatDate(fin_inscription)} 
                              value={fin_inscription}
                              onChange={(e) => setFinInscription(e.target.value)} 
                              disabled={statusBtn === 3 ? true : false}
                            />

                            <label form='caution-rendu'>Caution rendu</label>
                            <input type="text" name='caution-rendu' placeholder="50€" value={cautionRendu} onChange={(e) => setCautionRendu(e.target.value)} disabled={statusBtn === 3 ? true : false} />
                          </div>
                        </div>

                        <button type="button" onClick={handleConfirmClick}>Confirmer</button>

                      </form>

                  </div>
              </div>
          </div>
        )}
        {/* End modal */}



        <div className="f controlPanel">
          <div className='f'>
            <label className='label-search'>Recherche :
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
              <button 
                className='btn3' 
                onClick={() => handleCreate()}
                alt="Créer un nouveau adhérent"
                title="Créer un nouveau adhérent"
              >Créer</button>                    
              <button 
                className='btn3' 
                onClick={() => handleEdit()}
                alt="Modifie une fiche adhérent"
                title="Modifie une fiche adhérent"
              >Modifier</button>
              <button 
                className='btn3' 
                onClick={() => handleDelete()}
                alt="Supprime une fiche adhérent"
                title="Supprimer une fiche adhérent"
              >Supprimer</button>
            </div>
          </div>
        </div>
        <div className='f section-info'>
          <div className="f fdc message-info">
            <div className="f aic affiche-msg">
              <label htmlFor="message-info">Afficher&nbsp;</label>
              <input type="checkbox" name="showCheckBox" id="message-info" checked={affMsg} onChange={(e) => setAffMsg(e.target.checked)} />
              <button 
                className='btn4' 
                onClick={() => saveParams()}
                alt="enregistre les données sur message d'information qui s'affiche sur la page principale"
                title='Enregistre les modifications'
              >Enregistre</button>
            </div> 
            <input className='msg-info' type="text" placeholder='message' value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
          </div>
          <div className='f aic'>
            <img 
              src={imprimante} 
              onClick={printTable}
              alt="imprimante, imprime la liste des adhérents" 
              className='imprimante'
              title='Imprime la liste des adhérents'
            />
          </div>
        </div>
    </Shaping>
    <Footer />
  </>
  )
}