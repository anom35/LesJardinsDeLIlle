import React from 'react'
import Header from "../layout/Header"
import Footer from "../components/Footer"
import Shaping from "../layout/Shaping"
import "../styles/error404.css"

export default function Error404() {
    return (
        <div>
            <Shaping>
                <Header />
                <div className="error404">
                    <h1>404</h1>
                    <h2>Page non trouvée</h2>
                </div>
            </Shaping>
            <Footer />
        </div>
    )
}
