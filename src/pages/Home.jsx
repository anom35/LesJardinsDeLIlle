import React from 'react'
import Header from "../layout/Header"
import Carousel from "../components/Caroussel"
import Footer from "../components/Footer"
import Shaping from "../layout/Shaping"

export default function Home() {
    return (
        <div>
            <Shaping>
                <Header />
                <Carousel />
            </Shaping>
            <Footer />
        </div>
    )
}
