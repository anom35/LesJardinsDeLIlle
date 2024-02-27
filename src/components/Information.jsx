import React, { useState, useEffect } from 'react';
import "../styles/information.css";

export default function Information() {
    const [fileContent, setFileContent] = useState(null);
    const [checked, setChecked] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://82.66.97.94:3513/params', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) { 
                    throw new Error(`Erreur HTTP ${response.status}`); 
                } else {
                    const data = await response.json();
                    setChecked(data.affiche_message);
                    setFileContent(data.message);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    if (!checked) return null;
    return (<div className="f fc information" dangerouslySetInnerHTML={{ __html: fileContent }} />);
}
