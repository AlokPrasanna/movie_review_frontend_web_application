import React from 'react';
import { useApiContext } from '../../Components/ApiContex/ApiContext';
import { useApiContextTitle } from '../../Components/ApiConetexTitle/ApiContexTitle';
import SearchBar from '../SearchBar/SearchBar';
import '../../Style/Header.scss';
import { Link } from 'react-router-dom';

function Header() {

  const Key = localStorage.getItem('TMDBKey');

  const {setContextData} = useApiContext();
  const {setContextTitleData} = useApiContextTitle();

  const SendData = (SendId) =>{
    console.log("props dataID: ", SendId);
     if(SendId === 1){
       setContextData(`https://api.themoviedb.org/3/movie/popular?api_key=${Key}`);
       setContextTitleData("Popular");
     }else if(SendId === 2){
       setContextData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}`);
       setContextTitleData("Now Playing");
     }else if(SendId === 3){
       setContextData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Key}`);
       setContextTitleData("Up Comming");
     }
   }

  return (
    <div className='header'>
        <header className='nav-bar'>
              <Link to="/" className='app-name'>MRV</Link>
              <Link to='/'>Home</Link>
              <Link   to='/top-rated-movies'>Top Rated</Link>
              <Link   to='/filtered-movies' onClick={() => {SendData(1)}} >Popular</Link>
              <Link   to='/filtered-movies' onClick={() => {SendData(2)}}>Now Playing</Link>
              <Link   to='/filtered-movies' onClick={() => {SendData(3)}}>Up Comming</Link>
              <Link  to='/about'>About</Link>
              <SearchBar/>
        </header>
      <br />
    </div>
  )
}

export default Header
