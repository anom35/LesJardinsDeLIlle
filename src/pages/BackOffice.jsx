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







export default function Administration() {
    
  const [allUsers, setAllUsers] = useState([]);
  const [filterJardin, setFilterJardin] = useState("");
  const [filterNom, setFilterNom] = useState("");
  const [records, setRecords] = useState([]);
  


  const filteredData = allUsers.filter(user => {
    return (!filterJardin || user.jardin === filterJardin) && (!filterNom || user.nom.toLowerCase().includes(filterNom));
  });


  const addNewRecord = () => {
    const newRecord = { 
      id: records.length + 1, 
      date_inscription: reformatDate(new Date()), 
      nom: '', 
      prenom: '', 
      adresse: '',
      telephone: '',
      email: '',
      password: '',
      jardin: '',
      parcelle: '',
      caution: '',
      type_paiement: '',
      date_fin: reformatDate(new Date()),
      caution_rendu: ''
    }; 
    setRecords([...records, newRecord]);
  };

  const handleInputChange = (id, field, value) => {
    const newRecords = records.map(record => {
      if (record.id === id) {
        return { ...record, [field]: value };
      }
      return record;
    });
    setRecords(newRecords);
  };

  const handleSubmit = (id) => {
    const recordToSubmit = records.find(record => record.id === id);
    // Soumettre recordToSubmit à la base de données
    console.log('Submitting', recordToSubmit);
  };




  useEffect(() => {
    getAllAdherants()
      .then(response => {
        // Assurez-vous que response.data est toujours un tableau
        const usersData = Array.isArray(response.data) ? response.data : [];
        setAllUsers(usersData);
        setRecords(usersData);
      })
      .catch(error => {
        console.error(error);
        // Gérer l'erreur en définissant allUsers et records comme des tableaux vides
        setAllUsers([]);
        setRecords([]);
      });
  }, []);

  return (
    <>
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
                        <th>Mot de passe</th>
                        <th>Jardin</th>
                        <th>Parcelle</th>
                        <th>Caution</th>
                        <th>Type de paiement</th>
                        <th>Date de fin</th>
                        <th>Caution rendu</th>
                    </tr>
                </thead>
                <tbody>
                  {records.map(record => (
                    <tr key={record.id}>
                      <td>
                        <input type="date" value={record.date_inscription} onChange={(e) => handleInputChange(record.id, 'date_inscription', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.nom} onChange={(e) => handleInputChange(record.id, 'nom', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.prenom} onChange={(e) => handleInputChange(record.id, 'prenom', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.adresse} onChange={(e) => handleInputChange(record.id, 'adresse', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.telephone} onChange={(e) => handleInputChange(record.id, 'telephone', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.email} onChange={(e) => handleInputChange(record.id, 'email', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.jardin} onChange={(e) => handleInputChange(record.id, 'jardin', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.parcelle} onChange={(e) => handleInputChange(record.id, 'parcelle', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.caution} onChange={(e) => handleInputChange(record.id, 'caution', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.type_paiement} onChange={(e) => handleInputChange(record.id, 'type_paiement', e.target.value)} />
                      </td>
                      <td>
                        <input type="date" value={record.date_fin} onChange={(e) => handleInputChange(record.id, 'date_fin', e.target.value)} />
                      </td>
                      <td>
                        <input type="text" value={record.caution_rendu} onChange={(e) => handleInputChange(record.id, 'caution_rendu', e.target.value)} />
                      </td>
                      <td>
                        <input type="password" value={record.password} onChange={(e) => handleInputChange(record.id, 'password', e.target.value)} />
                      </td>

                      <td>
                        <button onClick={() => handleSubmit(record.id)}>Soumettre</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </Table>
        </TableContainer>
    </>
  )
}
