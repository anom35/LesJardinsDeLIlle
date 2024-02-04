
export async function getAllAdherants() {
    try {
        const response = await fetch('http://localhost:3513/get-all-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        return await response.json();;
    } catch (error) { console.log(error); }
};



export async function createAdherant(enregistrement) {
    try {
        const response = await fetch('http://localhost:3513/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                password: enregistrement.motDePasse,
                email: enregistrement.email,
                nom: enregistrement.nom,
                prenom: enregistrement.prenom,
                date_inscription: enregistrement.selectedDate,
                jardin: enregistrement.selectedJardin,
                parcelle: enregistrement.numParcelle, 
                adresse: enregistrement.adresse,
                telephone: enregistrement.telephone,
                date_fin: enregistrement.fin_inscription, 
                caution: enregistrement.caution,
                type_paiement: enregistrement.typePaiement,
                caution_rendu: enregistrement.cautionRendu 
            })
        });
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    } catch (error) { console.log(error); }

    return;
};





export async function modifyAdherant(enregistrement) {
    try {
        const response = await fetch(`http://localhost:3513/update-user/${enregistrement.email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                password: enregistrement.motDePasse,
                email: enregistrement.email,
                nom: enregistrement.nom,
                prenom: enregistrement.prenom,
                date_inscription: enregistrement.selectedDate,
                jardin: enregistrement.selectedJardin,
                parcelle: enregistrement.numParcelle, 
                adresse: enregistrement.adresse,
                telephone: enregistrement.telephone,
                date_fin: enregistrement.fin_inscription, 
                caution: enregistrement.caution,
                type_paiement: enregistrement.typePaiement,
                caution_rendu: enregistrement.cautionRendu 
            })
        });
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`); 
    } catch (error) { console.log(error); }

    return;
};




export async function deleteAdherant(email) {
    try {
      const response = await fetch(`http://localhost:3513/delete-user/${email}`, {
        method: 'DELETE',
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('authToken')}
      });
  
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    } catch (error) { console.error('Erreur lors de la suppression de l’adhérent:', error); }
  }



  export async function modifyParams(affMsg, texteMsg) {
    try {
        const response = await fetch("http://localhost:3513/update-params", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ affichage: affMsg, texte: texteMsg })
        });
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`); 
    } catch (error) { console.error('Erreur lors de la mise à jour de l’adhérent:', error); }

    return;
};



export async function getParams() {
    try {
        const response = await fetch("http://localhost:3513/params", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
        if (!response.ok) { 
            throw new Error(`Erreur HTTP ${response.status}`); 
        } 
        const valRet = await response.json();
        console.log(valRet);
        return (valRet);
    } catch (error) {
        console.error('Erreur lors de la récupération des paramètres:', error);
    }
}