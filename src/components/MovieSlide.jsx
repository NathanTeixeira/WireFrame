/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { GiFlexibleStar } from "react-icons/gi";

const MovieSlide = ({ movie, showLink = true }) => {


    const url = import.meta.env.VITE_API;
    const keyUrl = import.meta.env.VITE_KEY;
    const trailer = `${url}${movie.id}/videos?${keyUrl}`


    return (
        <div className="slide">
            {/* <iframe src={trailer}></iframe> */}
            <nav>
                <ul>
                    <li>
                        <h2>{showLink && <Link to={`/movie/${movie.id}`}>{movie.title}</Link>}</h2>
                    </li>
                    <li>
                        <p><strong> Sinopse: </strong> {movie.overview}</p>
                    </li>
                    <li>
                        <p>{movie.genres}</p>
                    </li>
                    <li>
                        <p>
                            <strong> Nota: </strong><GiFlexibleStar /> {movie.vote_average}
                        </p>
                    </li>
                </ul>
            </nav>
        </div>
    )
};

export default MovieSlide;