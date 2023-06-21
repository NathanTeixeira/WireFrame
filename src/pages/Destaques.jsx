import { useState, useEffect } from "react"
import './Home.css'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Destaque.css";


import { Pagination, Navigation } from "swiper";
import MovieSlide from "../components/MovieSlide";

const url = import.meta.env.VITE_API
const key = import.meta.env.VITE_KEY

const Destaques = () => {

    const [destaques, setDestaques] = useState([])



    const getDestaques = async (url) => {

        const res = await fetch(url)
        const data = await res.json()

        setDestaques(data.results)

    }

    useEffect(() => {

        const destaquesUrl = `${url}upcoming?${key}&language=pt-BR`
        getDestaques(destaquesUrl)

    }, [])



    return (
        <div className="container" >
            <h2 className="title" >
                Destaques
            </h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                <div>
                    {destaques.length === 0 && <p>carregando...</p>}
                    {destaques.length > 0 && destaques.map((movie) =>
                    (<SwiperSlide key={movie.id} >
                        <MovieSlide key={movie.id} movie={movie} />
                    </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}

export default Destaques