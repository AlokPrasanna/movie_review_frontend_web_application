import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
//import MovieDetails from '../../MovieDetails/MovieDetails.json';
import ImageClickNavigation from '../ImageClickNavigation/ImageClickNavigation';
import '../../Style/LatestMovieImagePropeties.scss';
import Card from '../Card/Card';
const Key = localStorage.getItem('TMDBKey');
//import { json } from 'react-router-dom';

function LatestMovieSwiper() {

    const [LatestMovies, setLatestMovies] = useState([1]);

    useEffect(() =>{
        try{
            fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${Key}`)
            .then(res => res.json())
            .then(data => setLatestMovies(data))
        }catch(err){
            console.error("Error! : ",err);
        }
    },[]);
  return (
    <div>
        <h1>Latest Movies</h1>

        <Card/>

        {/*{LatestMovies.map((movie) => (
                    <SwiperSlide className= 'swiper-slide' key={movie.id}>
                        <ImageClickNavigation movieId ={movie.id} path={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                    </SwiperSlide> 
                ))}     
        {/*<div className='latest-swiper'>
        <div className='swiper-button-prev'></div>
            <Swiper 
                modules={[Navigation,Pagination]}
                spaceBetween={0}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={true}
            >        
            </Swiper>
            <div className='swiper-button-next'></div>
                </div> */ }       
        <br />      
    </div>
  )
}

export default LatestMovieSwiper
