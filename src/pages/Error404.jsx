import React from 'react'
import Header from "../layout/Header"
import Footer from "../components/Footer"
import Shaping from "../layout/Shaping"
import fond from "../assets/images/fond_erreur.webp"
import "../styles/error404.css"

export default function Error404() {
    return (
        <div>
            <Shaping>
                <Header />
                <div className="error404">
                    <h1>Page non trouvée !</h1>
                    <p>Veuillez cliquer sur le menu Accueil</p>
                    <h2>ERREUR</h2>
                    <img src={fond} alt="voiture peugeot 404" />
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
