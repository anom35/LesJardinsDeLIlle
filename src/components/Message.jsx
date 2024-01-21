import React, { useState, useEffect } from 'react';

export default function MessageComponent({ message, erreur }) {
    const [isVisible, setIsVisible] = useState(true);
    const color = erreur ? "var(--bg-message-erreur)" : "var(--bg-message)";

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return isVisible ? (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        }}>
            <div style={{ 
                backgroundColor: color, 
                color: 'black',
                fontSize: '20px', 
                padding: '20px', 
                borderRadius: '10px', 
                border: '2px solid white',
                boxShadow: '0 0 20px black',
                maxWidth: '80%', 
                textAlign: 'center'
            }}>
                {message}
            </div>
        </div>
    ) : null;
};
