import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/header.css"
import logo from "../assets/images/logo_betton.png"

export default function Header() {
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
                        <Link to="/about">Jardins</Link>
                    </li>
                    <li>
                        <Link to="/reservations">Reservations</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
