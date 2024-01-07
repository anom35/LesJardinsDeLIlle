import React, { useState, useEffect } from 'react';
import image1 from "../assets/images/image1_small.jpg";
import image2 from "../assets/images/image2_small.jpg";
import image3 from "../assets/images/image3_small.jpg";
import "../styles/carousel.css";

export default function Carousel() {
    const [index, setIndex] = useState(1);
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Charger toutes les images en mémoire
        const preloadImages = [image1, image2, image3].map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        setImages(preloadImages);

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex % 3) + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    let imageToShow = images[index - 1] && (
        <img src={images[index - 1].src} alt={`Carousel ${index}`} key={`car-${index}`} />
    );

    return (
        <div className='carousel'>
            {imageToShow}
        </div>
    );
}
