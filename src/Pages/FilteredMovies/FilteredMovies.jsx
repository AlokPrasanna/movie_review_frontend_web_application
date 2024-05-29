import React, { useEffect, useState } from 'react';
import { useApiContext } from '../../Components/ApiContex/ApiContext';
import { useApiContextTitle } from '../../Components/ApiConetexTitle/ApiContexTitle';
import { Link } from 'react-router-dom';
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import Head from '../../Components/Head/Head';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import BodyContent from '../../Components/BodyContent/BodyContent';
import '../../Style/FilteredMovies.scss';



function FilteredMovies() {
  const {ApiUrl} = useApiContext();
  const {ApiTitle} = useApiContextTitle();
  const [IsLoading,setIsloading] = useState(false);
  const [MovieDetails,setMovieDetails] = useState([]);

  const [IsUrl,setIsUrl] = useState(true);

  console.log("Api Url: ",ApiUrl);
  console.log("Title: ",ApiTitle);

  useEffect(() => {
    if (!ApiUrl || !ApiTitle) {
      setIsUrl(false);
      return;
    }
  },[ApiUrl,ApiTitle])

  useEffect(() => {
    setTimeout(() => {
        setIsloading(false);
    },1500)
},[])

useEffect(() => {
    try{
        fetch(ApiUrl)
        .then(req => req.json())
        .then(data => setMovieDetails(data.results))
        .catch(err => {
            console.error("Error fetching data:", err);
        });
    }catch(err){
        console.error("Error! : ", err);
    }
},[IsLoading,ApiUrl,ApiTitle])

  return (
    <div className='filtered-movies'>
      <Head Title="Your Movies"/>
        <Header/>
        <BodyContent className='content'>
          {IsUrl ? 
          
          <div>
            {IsLoading ? 
            <div className='card'>
                <SkeletonTheme color="#202020" highlightColor='#444'>
                    <Skeleton height={300} duration={2} />
                </SkeletonTheme>
            </div> :
            <div>
                <h2 className='card-title'>{ApiTitle}</h2>
                <div className='card-content'>
                {MovieDetails.map(movie => (
                     <Link to={`/movie-page/${movie.id}`}>
                        <div className='card'>
                            <img className='image-filter' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.title} />
                            <div className='overlay-filter'>
                              <div className='title-filter'><span>{movie ? movie.title : " "}</span></div>                
                              <div className='release-date-filter'><span>{movie ? movie.release_date : " "}</span></div>
                            </div>
                        </div> 
                     </Link>   
                ))}
                </div>
            </div>

            } 
            </div>     
         
          : <div className='waiting'>Loading ...</div> }
          <br />
        </BodyContent>      
        <Footer/>
    </div>
  )
}

export default FilteredMovies