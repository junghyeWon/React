import PropTypes from "prop-types";

function Movie({coverImg, title, summary, genres}){
    return (
        <div className="item">
            <img src={coverImg} alt={title}/>
            <div>
                <strong>{title}</strong>
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
    coverImg : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    summary : PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;