import React, { useEffect, useState,useRef } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Head from '../../Components/Head/Head';
import BodyContent from'../../Components/BodyContent/BodyContent';
import '../../Style/Home.scss';
import Popular from '../../Components/Popular/Popular';
import axios from 'axios';
import GenreWithLanguageMoviesList from '../../Components/GenreWIthLanguageMoviesList/GenreWithLanguageMoviesList';
const Key = localStorage.getItem('TMDBKey');

function Home() {

  const [Id,setId] = useState(28);
  const [Language,setLanguage] = useState('en');
  const [IdTitle, setIdTitle] = useState('Action Movies');
  const [LanguageList,setLanguageList] = useState(['']);
  const [LanguageQuery, setLanguageQuery] = useState('');
  const [LanguageSuggestions , setLanguageSuggestions] = useState([]);

  const SearchBarRef = useRef(null);
  const [IsSearching,setIsSearching] = useState(false);

  useEffect(() => {
    const HandleClickOutside = (event) => {
      if (SearchBarRef.current && !SearchBarRef.current.contains(event.target)) {
        setLanguageList([]);
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", HandleClickOutside);
    return () => {
      document.removeEventListener("mousedown", HandleClickOutside);
    };
  }, [SearchBarRef]);

  useEffect(() => {
    try{

      const FetchLanguageData = (async() => {
        try{
          const result = await axios.get('https://api.themoviedb.org/3/configuration/languages',
          {params:{api_key:Key}})

          return result.data;
        }catch(err){
          console.error("Error fetching languages! : ", err);
          throw err;
        } 
      });

      Promise.all([FetchLanguageData()])
      .then(([Languages]) => {
          setLanguageSuggestions(Languages);
      });
    }catch(err){
      console.log("Error! : ", err);
    }
  },[LanguageQuery]);

  useEffect(() => {
    if(LanguageQuery.trim() === ''){
      setLanguageList([]);
      setIsSearching(false);
      return;
  }
    const FilteredLanguages = LanguageSuggestions.filter((lang) =>
      lang.english_name.toLowerCase().includes(LanguageQuery.toLowerCase())
    );
    setLanguageList(FilteredLanguages);
    setIsSearching(true);
  }, [LanguageQuery]);

  const GenreIdsAndNames = [
    { id: 28, name: 'Action Movies' },
    { id: 12, name: 'Adventure Movies' },
    { id: 16, name: 'Animation Movies' },
    { id: 35, name: 'Comedy Movies' },
    { id: 80, name: 'Crime Movies' },
    { id: 99, name: 'Documentary Movies' },
    { id: 18, name: 'Drama Movies' },
    { id: 10751, name: 'Family Movies' },
    { id: 14, name: 'Fantasy Movies' },
    { id: 36, name: 'History Movies' },
    { id: 27, name: 'Horror Movies' },
    { id: 9648, name: 'Mystery Movies' },
    { id: 10749, name: 'Romance Movies' },
    { id: 878, name: 'Science Friction' },
    { id: 53, name: 'Thriller Movies' },
    { id: 10752, name: 'War Movies' },
    { id: 37, name: 'Western Movies' },
  ];
  const HandeleSelectLanguage = (LanguageId) => {
    console.log("Language Id : ", LanguageId)
    setLanguage(LanguageId);
    setLanguageQuery('');
    setLanguageSuggestions([]);
    setLanguageList([]);
    setIsSearching(false);
};

const HandleSelectGenre = (genreId , genreName) => {
  setId(genreId);
  setIdTitle(genreName);
};
console.log("Language Suggestions: ", LanguageSuggestions);

  return (
    <div className='home-page'>          
          <Head Title='Home Page'/>
          <div>
            <Header/>
          </div>
          <div>
            <BodyContent>
              <Popular/>
              <br />
              <div className='genre-language'>
                <div className='genre-list'>
                  <label htmlFor='genre'>Choose Genre</label>
                  <section>
                    <select
                      value={Id}
                      onChange={(e) => HandleSelectGenre(e.target.value, e.target.options[e.target.selectedIndex].text)}
                    >
                      {GenreIdsAndNames.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </section>
                <div>
                  <div className='search-bar-language' ref={SearchBarRef}>  
                  <div className='search-bar-language'>  
                    <div>
                        <input
                        className='text-area'
                        type="text"
                        value={LanguageQuery}
                        onChange={(e) => setLanguageQuery(e.target.value)}
                        placeholder="Search language..."/>
                    </div>
                    <div className='related-lan-list'>
                      {IsSearching && LanguageList.length === 0 && <div ><p className='not-found-lan'>Invalid Search!</p></div>}

                      {LanguageList.length > 0 && (
                          <ul className='suggestions-list'>
                            {LanguageList.map((Language) => (
                                <li  key={Language.iso_639_1} onClick={() => HandeleSelectLanguage(Language.iso_639_1)}>{Language.english_name}</li>
                            )).slice(0,5)}
                          </ul>
                      )}
                    </div> 
                    </div>     
                  </div>
                </div>
              </div>
              </div>
              <br />
              
              <div>
                <GenreWithLanguageMoviesList 
                  GenreId={Id} 
                  Language={Language} 
                  GenreTitle={IdTitle} 
                />
              </div>
            </BodyContent>
          </div>
          <div>
            <Footer/>
          </div>
    </div>
  )
}

export default Home;
