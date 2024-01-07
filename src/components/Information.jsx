import React, { useState, useEffect } from 'react';
import "../styles/information.css";

export default function Information() {
    const [fileContent, setFileContent] = useState(null);

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const response = await fetch('../datas/Informations.txt');
                const content = await response.text();
                if (content.trim() !== "") {
                    setFileContent(content);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du fichier :', error);
            }
        };

        fetchFileContent();
    }, []);

    if (!fileContent) {
        return null;
    }

    return (
        <div className="information" dangerouslySetInnerHTML={{ __html: fileContent }} />
    );
};