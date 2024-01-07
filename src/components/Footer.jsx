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
                        <strong>Les jardins familiaux</strong>&nbsp;de la ville de <strong>Betton</strong>
                    </figcaption>
                </figure>
                <hr />
                <article>
                    <p><strong>Contactez-nous</strong></p>
                    <p className='mail'><span>&#9993;&nbsp;</span> lesjardinsdelille@gmail.com</p>
                </article>
            </footer>
        </>
    )
}
