import React, { useEffect, useState } from 'react';
import ImageClickNavigation from '../ImageClickNavigation/ImageClickNavigation';
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import '../../Style/Card.scss'

function Card({ url, title }) {
    const [IsLoading,setIsloading] = useState(true);
    const [MovieDetails,setMovieDetails] = useState([]);

    console.log("Movie Url: ", url);
    console.log("Typy of url: ", typeof(url));

    useEffect(() => {
        setTimeout(() => {
            setIsloading(false);
        },1500)
    },[])

    useEffect(() => {
        try{
            fetch(url)
            .then(req => req.json())
            .then(data => setMovieDetails(data))
        }catch(err){
            console.error("Error! : ", err);
        }
    },[IsLoading])

  return (
    <div>
        {IsLoading ? 
            <div className='card'>
                <SkeletonTheme color="#202020" highlightColor='#444'>
                    <Skeleton height={300} duration={2} />
                </SkeletonTheme>
            </div> :
            <div>
                <h2 className='card-title'>{title}</h2>
                {MovieDetails.map(movie => (
                   <div className='poster'>
                     <ImageClickNavigation
                       movieId={movie.id}
                       path={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`}
                       alt={movie.title}
                     >
                        <div className='overlay'>
                            <div className='title'><span>{movie ? movie.title : " "}</span></div>
                            <div className='overview'><span>{movie ? movie.overview : " "}</span></div>
                            <div className='release-date'><span>{movie ? movie.release_date : " "}</span></div>
                        </div>
                     </ImageClickNavigation>
                   </div>
                ))}
            </div>
        }      
    </div>
  )
}

export default Card
