import '../../Style/SearchBar.scss';
import React, { useState , useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
const Key = localStorage.getItem('TMDBKey');


function SearchBar() {
   const [Query,setQuery] = useState('');
   const [Suggestions , setSuggestions] = useState([]);
   const Navigate = useNavigate();
   const SearchBarRef = useRef(null);
   const [IsSearching,setIsSearching] = useState(false);

   useEffect(() => {
    const HandleClickOutside = (event) => {
      if (SearchBarRef.current && !SearchBarRef.current.contains(event.target)) {
        setSuggestions([]);
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", HandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", HandleClickOutside);
    };
  }, [SearchBarRef]);

   useEffect(() => {
    if(Query.trim() === ''){
        setSuggestions([]);
        setIsSearching(false);
        return;
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${Key}&query=${Query}`)
    .then(res => res.json())
    .then(data => { 
        const uniqueTitles = Array.from(new Set(data.results.map(movie => movie.title)));
        const uniqueMovies = uniqueTitles.map(title => data.results.find(movie => movie.title === title));
        setSuggestions(uniqueMovies);
        setIsSearching(true);
    })
    .catch(err => console.error("Error! : ", err))
   },[Query]);

   const HandleSelectMovie = (MovieId) => {
        Navigate(`/movie-page/${MovieId}`);
        setQuery('');
        setSuggestions([]);
        setIsSearching(false);
   };

  return (
    <div className='search-bar' ref={SearchBarRef}>  
        <div>
            <input
            className='text-area'
            type="text"
            value={Query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."/>
        </div>
        <div>{IsSearching && Suggestions.length === 0 && <p className='not-found'>No movies found!</p>}
        {Suggestions.length === 1 && (
          <ul className='suggestions-list'>
            <li key={Suggestions[0].id} onClick={() => HandleSelectMovie(Suggestions[0].id)}>
              {Suggestions[0].title}
            </li>
          </ul>
        )}
        {Suggestions.length > 1 && (
          <ul className='suggestions-list'>
            {Suggestions.slice(0, 5).map((movie) => (
              <li key={movie.id} onClick={() => HandleSelectMovie(movie.id)}>{movie.title}</li>
            ))}
          </ul>
        )}
        </div>      
    </div>
  )
}

export default SearchBar