import {useEffect, useState} from "react";


function MovieApp(){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(0);
    useEffect(() => {
        fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`)
            .then((response) => response.json())
            .then(json => {
                setMovies(json.data.movies);
                //setSelectedMovie의 초기값이 0인 경우 금액입력을 해도 결과가 NaN이 되버림 (첫 코인의 가격을 넣어두기)
                setSelectedMovie(1);
                setLoading(false);
            })
    }, []);
    // console.log(movies, selectedMovie);

    return (
        <div>
            {loading ? (
            <strong>Loading...</strong>
            ) : null }
        </div>
    );
}

export default MovieApp;