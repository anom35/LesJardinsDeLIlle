import React, { useState, useEffect } from 'react';

export default function MessageComponent({ message }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

  return isVisible ? (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
            {message}
        </div>
    ) : null;
};