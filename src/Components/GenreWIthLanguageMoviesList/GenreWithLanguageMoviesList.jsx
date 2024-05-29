import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
//import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import '../../Style/GenreMoviesList.scss'
const Key = localStorage.getItem('TMDBKey');

function GenreWithLanguageMoviesList(props) {

    const [GenreMovies, setGenreMovies] = useState(['']);
    const GenreId = props.GenreId;
    const Language = props.Language;
    const GenreTitle = props.GenreTitle;

    console.log("GenreId: ", GenreId);
    console.log("Language: ", Language);
    console.log("Title: ", GenreTitle);

    useEffect(() => {
        try{
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${Key}&with_genres=${GenreId}&with_original_language=${Language}`)
            .then(res => res.json())
            .then(data => setGenreMovies(data.results))
            .catch((err) => {
                console.error("Error! : ", err);
            });
        }catch(err){
            console.error("Error! : ", err);
        }
    },[GenreId,GenreTitle,Language]);

    console.log("Genre Movies list: ", GenreMovies );

  return (
    <div className='genre-movies'>
        <div className='genre-title'>{GenreTitle}</div><br />
        {GenreMovies && GenreMovies.length > 0 && (
            <div className='content-list'>
                {GenreMovies.map((movie) => (
                    <div className='genre' key={movie.id}>
                        <Link to={`/movie-page/${movie.id}`}>
                            <img className='genre-language-img' src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path}`} alt={movie.title} />
                            <div className='overlay-genre'>
                                <div className='title-genre'><span>{movie ? movie.title : " "}</span></div><br />
                                <div className='release-date-genre'><span>{movie ? movie.release_date : " "}</span></div>
                            </div>     
                        </Link>     
                    </div>
                ))}
            </div>
        )}

    </div>
  )
}

export default GenreWithLanguageMoviesList
