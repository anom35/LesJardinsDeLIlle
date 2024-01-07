import React from 'react'
import image1 from "../assets/images/fonctionnement.webp"
import "../styles/fonctionnement.css"

export default function Fonctionnement() {

    return (
        <div className='fonctionnement-container'>
            <div className="fonctionnement">
                <div className='fonctionnement-article'>
                    <h2>Fonctionnement :</h2>
                    <article>
                        <p>
                            <strong>L’objet de l’association</strong> est de regrouper les jardiniers résidant à Betton afin de favoriser la 
                            &nbsp;<strong>culture potagère</strong>, promouvoir le <strong>jardinage écologique</strong>, 
                            &nbsp;créer des<strong> liens</strong> <strong>sociaux</strong> 
                            &nbsp;par l’entraide et l’échange de savoirs. Elle coopère avec la municipalité de Betton pour 
                            &nbsp;<strong>sensibiliser au jardinage</strong> les habitants et notamment les plus jeunes et 
                            &nbsp;<strong>organiser des manifestations</strong> et autres animations dans le cadre de la vie locale.
                        </p>
                    </article>
                </div>
                <div>
                    <img src={image1} alt="Le fonctionnement de l'association" />
                </div>
            </div>
        </div>
    )
}