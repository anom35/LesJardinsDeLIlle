import React from 'react'
import Header from "../layout/Header"
import Carousel from "../components/Caroussel"
import Footer from "../layout/Footer"
import Shaping from "../layout/Shaping"
import Presentation from "../components/Presentation"
import Information from "../components/Information"
import Histoire from "../components/Histoire"
import Fonctionnement from "../components/Fonctionnement"
import InfoParcelle from "../components/InfoParcelle"

export default function Home() {
    return (
        <div>
            <Shaping>
                <Header />
                <Information />
                <Carousel />
                <Presentation />
                <Histoire />
                <Fonctionnement />
                <InfoParcelle />
            </Shaping>
            <Footer />
        </div>
    )
}
