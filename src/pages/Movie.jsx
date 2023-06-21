import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from "react-icons/bs";

import MovieCard from '../components/MovieCard';

import "./Movie.css";


const url = import.meta.env.VITE_API
const key = import.meta.env.VITE_KEY


const Movie = () => {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {

    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)

  }

  useEffect(() => {

    const movieUrl = `${url}${id}?${key}&language=pt-BR`
    getMovie(movieUrl)

  }, [])


  const formatCurrency = (number) => {
    try {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error)
    }
    
  };

  const forma = (number) => {
    const hora = Math.floor(number/60)
    const min = number % 60
    const textoHoras = (`00${hora}h`).slice(-2);
    const textoMinutos = (`00${min}m`).slice(-3);
  
    return `${textoHoras }:${textoMinutos}`;
  };



  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{forma(movie.runtime)}</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Movie