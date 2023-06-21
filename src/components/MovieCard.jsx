/* eslint-disable react/prop-types */
import { GiFlexibleStar } from "react-icons/gi";
import { Link } from "react-router-dom";


const MovieCard = ({movie, showLink = true}) => {


    const imageUrl = import.meta.env.VITE_IMG;
    

    return (
        <div className='movie-card' >
            <img src={imageUrl + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <GiFlexibleStar /> {movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    )
};

export default MovieCard;
