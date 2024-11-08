import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail(){
    const {id} = useParams(); // Route 로 넘겨받은 파라미터 값
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        // console.log(id);
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);
    // console.log(movie)
    return (
        <div>
            {loading ? (<strong>Loading...</strong>) : (
                <div>
                    <img src={movie.medium_cover_image} alt={movie.title}/>
                    <div>
                        <strong><Link to={movie.url} target="_blank">{movie.title}</Link></strong><em>({movie.year})</em>
                        <span>{movie.description_full}</span>
                        <ul>
                            {movie.genres.map((g) => (
                                <li key={g}>{g}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;