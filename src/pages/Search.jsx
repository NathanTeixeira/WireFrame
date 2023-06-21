import { useEffect, useState } from 'react';
import './Home.css'
import MovieCard from '../components/MovieCard'
import { useSearchParams } from 'react-router-dom';


const searchUrl = import.meta.env.VITE_SEARCH;
const key = import.meta.env.VITE_KEY;


const Search = () => {

  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])

  const query = searchParams.get("q")

  const getSeachMovies = async (url) => {
    
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)

  }

  useEffect(() => {

    const searchQuery = `${searchUrl}${key}&query=${query}`

    getSeachMovies(searchQuery)

  }, [query])


  return (
    <div className="container" >
      <h2 className="title" >
        Resultados de: 
          <span className='query-text' > 
            {query}
          </span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 && 
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search