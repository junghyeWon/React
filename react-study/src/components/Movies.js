import {useEffect, useState} from "react";
import Movie from './Movie';

function Movies(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState(0);
    const getMovies = async() => {
        // 축약 ver 1
        /*const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`);
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);*/

        // 축약 ver 2
        const json = await (
            await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9.7&sort_by=year`)
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    }
    useEffect(() => {
        // 축약하고 함수로 호출
        getMovies();

        // 기본 ver
        /*fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
        .then((response) => response.json())
        .then(json => {
            setMovies(json.data.movies);
            //setSelectedMovie의 초기값이 0인 경우 금액입력을 해도 결과가 NaN이 되버림 (첫 코인의 가격을 넣어두기)
            setSelectedMovie(1);
            setLoading(false);
        });*/
    }, []);
    console.log(movies);

    return (
        <div className="guide_wrap">
            {loading ? (<strong>Loading...</strong>) : (
            <div className="movie_list">
                {movies.map((movie) => (
                    <Movie key={movie.id} id={movie.id} coverImg={movie.medium_cover_image} title={movie.title} year={movie.year} summary={movie.summary} genres={movie.genres} />
                ))}
            </div>
            )}
        </div>

        // 기존 movies map 안에서 돌던 마크업을 Movie 컴포넌트로 분리
        /*<div className="item" key={movie.id}>
            <img src={movie.medium_cover_image} alt={movie.title} />
            <div>
                <strong>{movie.title}</strong>
                <span>{movie.summary}</span>
                <ul>
                    {movie.genres.map((g) => <li key={g}>{g}</li>)}
                </ul>
            </div>
        </div>*/
    );
}

export default Movies;