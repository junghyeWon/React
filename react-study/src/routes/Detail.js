import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail(){
    const {id} = useParams(); // Route 로 넘겨받은 파라미터 값
    const [movie, setMovie] = useState([]);
    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
    }
    useEffect(() => {
        getMovie();
    }, []);

    console.log(movie);

    return (
        <h1>Detail</h1>
    );
}

export default Detail;