import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import User from "../pages/User"
import "../styles/header.css"
import logo from "../assets/images/logo_betton.png"
import user_image from "../assets/images/user.webp"

export default function Header() {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };

    return (
        <div className='header'>
            <div className='header-top'>
                <div className='header-top-image'>
                    <Link to="/betton">
                        <img src={logo} alt="Logo de la ville de Betton" />
                    </Link>
                </div>
                <div className='titre-header'>
                    <h1>les jardins de l'Ille</h1>
                </div>
            </div>
            <div className='menu-header'>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/jardins">Jardins</Link>
                    </li>
                    <li>
                        <Link to="/reservations">Reservations</Link>
                    </li>
                    <div className="menu-user">
                        <img 
                            className="user_image" 
                            src={user_image} 
                            alt="connexion utilisateur pour les admins du site web" 
                            onClick={openModal}
                        />
                        <User show={showModal} handleClose={closeModal} />
                    </div>
                </ul>
            </div>
        </div>
    )
}
