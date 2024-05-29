import React, { useEffect, useState } from 'react';
import '../../Style/Popular.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
//import ImageClickNavigation from '../ImageClickNavigation/ImageClickNavigation';
import { Link } from 'react-router-dom';
const Key = localStorage.getItem('TMDBKey');

function Popular() {
    const [PopularMovies, setPopularMovies] = useState([]);

    useEffect(()=>{
        try{
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${Key}`)
            .then(res => res.json())
            .then(data => setPopularMovies(data.results))
        }catch(err){
            console.error("Error! : ",err)
        }
    },[]);   
    console.log("Popular Movies: ", PopularMovies);
  return (
    <div>
        <div className='body'>
        {PopularMovies.length > 0 && (
  <Carousel
    showThumbs={false}
    autoPlay={true}
    infiniteLoop={true}
    showStatus={false}
    transitionTime={3}
  >
    {PopularMovies.map((movie) => (
      <div key={movie.id} className='carousel-slide'>
        <Link to={`/movie-page/${movie.id}`}>
          <div className='popular'>
            <img className='image-popular' src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.title} />
          </div>
            <div className='overlay-popular'>
              <div className='title-popular'><span>{movie ? movie.title : " "}</span></div>
              <div className='overview-popular'><span>{movie ? movie.overview : " "}</span></div>
              <div className='release-date-popular'><span>{movie ? movie.release_date : " "}</span></div>
            </div>
           
        </Link>     
      </div>
    ))}
  </Carousel>
)}
        </div>      
    </div>
  )
}

export default Popular
