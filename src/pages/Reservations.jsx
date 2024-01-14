import React from 'react'
import Header from "../layout/Header"
import Shaping from '../layout/Shaping'
import Footer from "../layout/Footer"
import "../styles/reservations.css"

export default function Reservations() {

    return (
        <>
            <Shaping>
                <Header />
                <div className='reservations'>
                    <h1>Les réservations</h1>
                    <article>
                        <p>Pour <strong>bénéficier d’un jardin familial</strong>, 
                            il faut en faire la demande en <strong>completant et retournant le formulaire ci-dessous</strong>
                            &nbsp;à l'adresse indiquée. Si aucune parcelle n'est disponible au moment de la demande, 
                            le demandeur sera inscrit sur une <strong>liste d'attente</strong>.
                        </p>
                    </article>
                    <a 
                        className='btn'
                        href="https://docs.google.com/forms/d/e/1FAIpQLScrgbwi_Txv3kSUeKnynqbMDPFDFPxQVpE2ff-HPmLsFWMl3w/viewform?entry.432530089=80+m2+%C3%A0+la+Piconnerie" 
                        target="_blank" 
                        rel="noopener noreferrer">
                        Demande de jardin familial en ligne
                    </a>
                </div>
            </Shaping>
            <Footer />
        </>
    )
}
