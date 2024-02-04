import React, { useState, useEffect } from 'react';
import "../styles/information.css";

export default function Information() {
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3513/params', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
                if (!response.ok) { 
                    throw new Error(`Erreur HTTP ${response.status}`); 
                } else {
                    const data = await response.json();
                    if (data.affiche_message) setFileContent(data.message);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="information" dangerouslySetInnerHTML={{ __html: fileContent || "" }} />
    );
}
