import React from 'react'
import image from "../assets/images/une_parcelle_est.webp"
import zeroPseticides from "../assets/images/zero_pesticides2.jpg"
import "../styles/infoparcelle.css"

export default function InfoParcelle() {

    return (
        <div>
            <div className="info-parcelle">
                <div className='info-image'>
                    <h2>Une parcelle c'est ...</h2>               
                    <img src={image} alt="Contenu d'une parcelle, division de la parcelle, un cabanon et une cuve de récupération d'eau" />
                </div>
                <div className='info-article'>
                    <div>
                        <article>
                            <p>
                                <strong>L’objet de l’association</strong> est de regrouper les jardiniers résidant à Betton afin de favoriser la 
                                &nbsp;<strong>culture potagère</strong>, promouvoir le <strong>jardinage écologique</strong>, créer des<strong> liens
                                &nbsp;</strong> <strong>sociaux</strong> par l’entraide et l’échange de savoirs. Elle coopère avec la municipalité de 
                                &nbsp;Betton pour <strong>sensibiliser au jardinage</strong> les habitants et notamment les plus jeunes et <strong>
                                &nbsp;organiser des manifestations</strong> et autres animations dans le cadre de la vie locale.
                            </p>
                        </article>
                    </div>
                    <div className="zero-pesticides">
                        <img src={zeroPseticides} alt="Information supplémentaire concernant l'interdiction de pesticides" />
                    </div>
                </div>
            </div>
        </div>
    )
}
