import React from 'react'
import image1 from "../assets/images/histoire.webp"
import "../styles/histoire.css"

export default function Histoire() {

    return (
        <div className='histoire-container'>
            <div className="histoire">
                <div>
                    <img src={image1} alt="Histoire des jardins de l'Ille" />
                </div>
                <div className='histoire-article'>
                    <h2>L’histoire des Jardins de l’Ille :</h2>
                    <article>
                        <p>
                            Projet longuement muri, <strong>les jardins familiaux</strong> ont éclos en <strong>2010</strong>
                            &nbsp;sur les terrains communaux de la Chaperonnais et la Piconnerie. Les futurs jardiniers se sont constitués en association, 
                            &nbsp;«&nbsp;<strong>Les Jardins de l’Ille&nbsp;»</strong>, afin de définir un règlement de fonctionnement et gérer les terrains. 
                            &nbsp;D’une surface avoisinant les 100m2, les <strong>36 parcelles</strong> ont rapidement vu croître <strong>fruits, légumes et plantes aromatiques</strong>, la commune mettant 
                            &nbsp;<strong>à disposition compost et paillage, cabanons et récupérateurs d’eau</strong>. 
                            &nbsp;Lieux d’échange et de rencontre, les jardins familiaux sont l’occasion de <strong>partager savoirs et bonnes pratiques</strong>, 
                            &nbsp;de semer chez les uns les graines d’un autre rapport à la <strong>consommation</strong>
                            &nbsp;tout en cultivant la <strong>sensibilité écologique</strong> des autres.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    )
}