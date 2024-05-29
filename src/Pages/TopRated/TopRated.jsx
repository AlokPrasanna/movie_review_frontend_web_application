import '../../Style/TopRated.scss';
import React , {useEffect, useState} from 'react';
import Head from '../../Components/Head/Head';
import Header from '../../Components/Header/Header';
import BodyContent from '../../Components/BodyContent/BodyContent';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Key = localStorage.getItem('TMDBKey');

function TopRated() {
    const [TopRatedMoviesList,setTopRatedMoviesList] = useState([]);
    const [MoviesList,setMoviesList] = useState([]);
    const [IsLoading,setIsloading] = useState(false);

    useEffect(() => {
      setIsloading(true);
      setTimeout(() => {
          setIsloading(false);
      },1000)
  },[])

  useEffect(() => {
    const fetchData = async () => {
       try {
          const Response = await axios.get('https://movies-rating-site-backend-web-service.onrender.com/get-movie-ratings');
 
          if (Response.data.length > 0) {
             const FilteredMovies = Response.data.filter((movie) => {
                const RatingCount = parseInt(movie.rating_count, 10);
                const FansCount = parseInt(movie.fans_count, 10);
                const CalRating = (RatingCount / FansCount).toFixed(1);
 
                return CalRating >= 4.5 && CalRating <= 5;
             });
 
             setTopRatedMoviesList(FilteredMovies);
             GetMovieDetails();
          } else {
             console.log("Movies not found!");
             setTopRatedMoviesList([]);
          }
       } catch (err) {
          console.error("Error! : ", err);
       }
    };
    fetchData();
 }, [IsLoading]);

 const GetMovieDetails = async () => {
  try {
    const movieDetailsArray = await Promise.all(
      TopRatedMoviesList.map(async (movie) => {
        const MovieId = parseInt(movie.movie_id, 10);
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${MovieId}?api_key=${Key}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching movie details:", error);
          return null;
        }
      })
    );

    const filteredMovieDetailsArray = movieDetailsArray.filter((movie) => movie !== null);
    setMoviesList((prevMoviesList) => [...prevMoviesList, ...filteredMovieDetailsArray]);
  } catch (err) {
    console.error("Error!: ", err);
  }
};


    console.log("Top Rated Movies: ", MoviesList);

  return (
    <div className='top-rated-movies'>
      <Head Title="Top Rated Movies" />
      <Header/>
      <BodyContent>       
          <div>
          <h2 className='card-title'>Top Rated Movies</h2>
            {IsLoading ? 
              <div className="loading-container">
                  <p className='loading-text'>Loading...</p>
              </div> :
            <div>
                <div className='card-content'>
                {MoviesList && MoviesList.length> 0 ? MoviesList.map((movie) => (
                     <Link to={`/movie-page/${movie.id}`}>
                        <div className='card'>
                            <img className='image-filter' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.title} />
                            <div className='overlay-filter'>
                              <div className='title-filter'><span>{movie ? movie.title : " "}</span></div>                
                              <div className='release-date-filter'><span>{movie ? movie.release_date : " "}</span></div>
                            </div>
                        </div> 
                     </Link>   
                )): <div className="loading-container">
                      <p className='loading-text'>Top Rated List Empty!</p>
                    </div>
                } 
                </div>
            </div>

            } 
            <br />
            </div>     
      </BodyContent>
      <Footer/>   
    </div>
  )
}

export default TopRated
