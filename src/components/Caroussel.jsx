import React, { useState, useEffect } from 'react';
import image1 from "../assets/images/image1_small.jpg";
import image2 from "../assets/images/image2_small.jpg";
import image3 from "../assets/images/image3_small.jpg";
import "../styles/carousel.css";

export default function Carousel() {
    const [index, setIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex % 3) + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    let imageToShow;

    if (index === 1) {
        imageToShow = <img src={image1} alt="Des parcelles bien entretenues" key="car-1" />;
    } else if (index === 2) {
        imageToShow = <img src={image2} alt="De jolies parcelles" key="car-2" />;
    } else if (index === 3) {
        imageToShow = <img src={image3} alt="Du paillaige de parcelles" key="car-3" />;
    }

    return (
        <div className='carousel'>
            {imageToShow}
        </div>
    );
}