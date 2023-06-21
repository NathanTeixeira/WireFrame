import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import './Home.css'
import Destaques from "./Destaques"

const url = import.meta.env.VITE_API
const key = import.meta.env.VITE_KEY
const bearer = import.meta.env.VITE_BEARER

const Home = () => {

  const [destaques, setDestaques] = useState([])
  const [destaquesFixo, setDestaquesFixo] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");



  const getDestaques = async (url) => {

    const res = await fetch(url)
    const data = await res.json()

    setDestaques(data.results)
    setDestaquesFixo(data.results);
    setCarregando(false);
  }

  useEffect(() => {

    const destaquesUrl = `${url}popular?${key}`
    getDestaques(destaquesUrl)

  }, [carregando])

  const getNewPopularMovies = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setDestaques((movies) => [...movies, ...data.results]);
    setDestaquesFixo((movies) => [...movies, ...data.results]);
    getSelectedMovies();
    setCarregando(false);
  };

  useEffect(() => {
    const popularUrl = `${url}popular?${key}&page=${page}`;
    getNewPopularMovies(popularUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = (event) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    setSelectedOption(value);
  };

  const getSelectedMovies = () => {
    if (selectedOption) {
      const filteredMovies = destaquesFixo.filter((movie) =>
        movie.genre_ids.includes(selectedOption)
      );
      setDestaques(filteredMovies);
      if (filteredMovies.length < 20) {
        setPage((page) => page + 1);
      }
    } else {
      setDestaques(destaquesFixo);
    }
  };

  useEffect(() => {
    getSelectedMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (!carregando && scrolledToBottom) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carregando]);

  const getGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${bearer}`,
      },
    };

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR",
        options
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);



  return (
    
    <>

    <Destaques />

    <div className="container" >
      <h2 className="title" >
        Lançamentos 
      </h2>
      <select defaultValue="Select a genre" onChange={handleChange}>
        <option disabled>Filtrar por:</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <div className="movies-container">
      {carregando && <p>Carregando...</p>}
        {!carregando && destaques.length === 0 && (
          <p>Não há filmes.</p>
        )}
        {!carregando &&
          destaques.length > 0 &&
          destaques.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
    </>
  )
}

export default Home
