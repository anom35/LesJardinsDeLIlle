import React from 'react'
import logo from "../assets/images/logo_betton.png"
import "../styles/footer.css"

export default function Footer() {
    return (
        <>
            <footer>
                <figure>
                    <img src={logo} alt="Logo de la ville de Betton 35830" />
                    <figcaption>
                        <strong>Les jardins familiaux</strong> de la ville de <strong>Betton</strong>
                    </figcaption>
                </figure>
                <article>
                    <p><strong>Contactez-nous</strong></p>
                    <p><a href="mailto:lesjardinsdelille@gmail.com">&#9993; email</a></p>
                 </article>
            </footer>
        </>
    )
}
