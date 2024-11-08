import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function Movie({id, coverImg, title, summary, genres}){
    return (
        <div className="item">
            <img src={coverImg} alt={title}/>
            <div>
                <strong><Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>{title}</Link></strong>
                <span>{summary}</span>
                <ul>
                    {genres.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

Movie.prototype = {
    id : PropTypes.number.isRequired,
    coverImg : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    summary : PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;