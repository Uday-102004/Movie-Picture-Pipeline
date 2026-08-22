import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movie.id}`)
      .then((response) => {
        setDetails(response.data.movie);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [movie]);

  if (!details) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div className="movieDetails">
      <h2>{details.title}</h2>
      <p>{details.description}</p>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default MovieDetails;