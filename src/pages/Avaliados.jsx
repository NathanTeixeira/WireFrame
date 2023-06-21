
import { useEffect, useState } from 'react'
import './Home.css'
import MovieCard from '../components/MovieCard'

const Avaliados = () => {

    const moviesUrl = import.meta.env.VITE_API
    const apiKey = import.meta.env.VITE_KEY


    const [destaques, setDestaques] = useState([])

    const getDestaques = async (url) => {

        const res = await fetch(url)
        const data = await res.json()

        setDestaques(data.results)

    }


    useEffect(() => {

        const destaquesUrl = `${moviesUrl}top_rated?${apiKey}`

        getDestaques(destaquesUrl)

    }, [])
    return (
        <div className="container" >
            <h2 className="title" >
                Melhores Avaliados
            </h2>
            <div className="movies-container">
                {destaques.length === 0 && <p>carregando...</p>}
                {destaques.length > 0 && destaques.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Avaliados












