import React from 'react';
import { Link } from 'react-router-dom';

function ImageClickNavigation(props) {
  return (
    <div>
      <Link to={`/movie-page/${props.movieId}`} ><img className='image' src={props.path} alt={props.alt} /></Link>
    </div>  
  )
}

export default ImageClickNavigation
