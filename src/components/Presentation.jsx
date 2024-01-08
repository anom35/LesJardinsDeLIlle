import React from 'react'
import image1 from "../assets/images/image0.jpg"
import "../styles/presentation.css"

export default function Presentation() {

    return (
        <div className='presentation'>
            <div className="jardins-familiaux">
                <h2 className='bg-titre'>Les jardins familiaux</h2>
                <img src={image1} alt="Vue d'ensemble de jardins potagés" />
                <article>
                    Créés en
                    <strong>&nbsp;2010&nbsp;</strong> 
                    sur les sites de la Piconnerie et la Chaperonnais, les 
                    <strong>&nbsp;jardins familiaux&nbsp;</strong> 
                    sont gérés par 
                    <strong>&nbsp;l’association «&nbsp;Les Jardins de l’Ille&nbsp;»</strong>. 
                    Attribués à des familles n’ayant pas ou peu de terrain, ces jardins offrent la possibilité de 
                    <strong>&nbsp;cultiver son propre potager&nbsp;</strong> 
                    tout en échangeant 
                    <strong>&nbsp;conseils et bonnes pratiques</strong>.
                </article>
            </div>
        </div>
    )
}
