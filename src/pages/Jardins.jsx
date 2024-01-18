import React from 'react'
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import piconnerie from "../assets/images/la_piconnerie.webp"
import renaudais from "../assets/images/la_renaudais.webp"
import plan_piconnerie from "../assets/images/plan_piconnerie.webp"
import plan_chaperonnais from "../assets/images/plan_renaudais.webp"
import parking_chaperonnais from "../assets/images/renaudais1.jpg"
import parking_piconnerie from "../assets/images/piconnerie2.webp"
import "../styles/jardins.css"

export default function Jardins() {

    return (
        <div>
            <Shaping>
                <Header />
                <div className="jardins fc">
                    <h1>Les jardins familiaux</h1>
                    <h2>deux sites existent </h2>
                    <p className='liste-jardins'>La <strong>Piconnerie</strong> et la <strong>Chaperonnerais</strong></p>
                    <div className="carte-jardins f jca">
                        <div className="piconnerie fc fdc aic">
                            <h3>La Piconnerie</h3>
                            <p>
                                1 la Piconnerie,
                                35830 BETTON
                            </p>
                            <img src={piconnerie} alt="Jardins de la Piconnerie" />
                            <br />
                            <p><strong>Emplacement</strong></p>
                            <img className="image-emp-pic" src={plan_piconnerie} alt="Emplacement de la Piconnerie" />
                            <img src={parking_piconnerie} alt="Parking et chemin pour accéder aux jardins de la Piconnerie" />
                        </div>
                        <div className="renaudais fc fdc aic">
                            <h3>La Chaperonnerais</h3>
                            <p>
                                la Chaperonnais,
                                35830 Betton
                                <br />
                                (<i>Derrière le <strong>centre de loisirs</strong></i>)
                            </p>
                            <img src={renaudais} alt="Jardins de la Chaperonnais" />
                            <br />
                            <p><strong>Emplacement</strong></p>
                            <img src={plan_chaperonnais} alt="Emplacement de la Chaponnerais" />
                            <img src={parking_chaperonnais} alt="Parking et chemin pour accéder aux jardins de la Chaperonnerais" />
                        </div>
                    </div>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}

