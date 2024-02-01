let errorMessage = "";
let successMessage = "";
let setErrorMessage = false;
let response = null;

export async function getAllAdherants() {
    let allUsers = [];
    let countUsers = 0;
    let errorMessage = "";

    try {
        response = await fetch('http://localhost:3513/get-all-users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        if (!response.ok) { 
            throw new Error(`Erreur HTTP ${response.status}`); 
            setErrorMessage = true;
        }
        allUsers = await response.json();
        countUsers = allUsers.length;
    } catch (error) {
        errorMessage = "Erreur lors de la récupération des données des adhérents";
        setErrorMessage = false;
    }

    return { allUsers, countUsers, errorMessage };
};



export async function createAdherant(enregistrement) {
    try {
        response = await fetch('http://localhost:3513/signup', {
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
        if (!response.ok) { 
            throw new Error(`Erreur HTTP ${response.status}`); 
            setErrorMessage = true;
        } else { 
            successMessage = "Adhérent créé avec succès !";
            setErrorMessage = false;
        }
    } catch (error) {
        errorMessage = "Erreur lors de la création d'une fiche adhérent";
        successMessage = "Erreur lors de la création !";
        setErrorMessage = true;
    }

    return (response, errorMessage);
};





export async function modifyAdherant(enregistrement) {
    try {
        response = await fetch(`http://localhost:3513/update-user/${enregistrement.email}`, {
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
        if (!response.ok) { 
            throw new Error(`Erreur HTTP ${response.status}`); 
            setErrorMessage = true;
        } else { 
            successMessage = "Adhérent modifié avec succès !";
            setErrorMessage = false;
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l’adhérent:', error);
        errorMessage = "Erreur lors de la modification de la fiche adhérent";
        successMessage = "Erreur lors de la modification !";
        setErrorMessage = true;
    }

    return (response, errorMessage);
};