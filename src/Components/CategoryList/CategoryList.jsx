import React, { useState } from 'react';
import '../../Style/CategoryList.scss';
import { Link } from 'react-router-dom';
import { useApiContext } from '../ApiContex/ApiContext';
const Key = localStorage.getItem('TMDBKey');

function CategoryList({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const {setContextData} = useApiContext();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const SendUrl = (DataId) =>{
    console.log("data Id: ", DataId);
    if(DataId === 1){
      setContextData();
    }else if( DataId === 2){
      setContextData(`https://api.themoviedb.org/3/movie/latest?api_key=${Key}`);
    }else if(DataId === 3){
      setContextData(`https://api.themoviedb.org/3/movie/popular?api_key=${Key}`);
    }else if(DataId === 4){
      setContextData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}`);
    }else if(DataId === 5){
      setContextData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Key}`);
    }else{
      setContextData("Non");
    }
  }
  //console.log("Set Context Data: ",setContextData);

  return (
    <div className='category-list'>
      <div
        className={`categories ${isOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <ul>
            <li>
              <Link to="/filtered-movies/1/1/0/0" onClick={() => SendUrl(1)}>Top Rated</Link>{/*onClick={SendUrl(1)} dont use like this !. this is auto function calling*/ }
            </li>
            <li>
              <Link to="/filtered-movies/1/2/0/0" onClick={() => SendUrl(2)}>Latest</Link>
            </li>
            <li>
               <Link to="/filtered-movies/1/3/0/0" onClick={() => SendUrl(3)}>Popular</Link>
            </li>
            <li>
              <Link to="/filtered-movies/1/4/0/0" onClick={() => SendUrl(4)}>Now Playing</Link>
            </li>
            <li>
              <Link to="/filtered-movies/1/5/0/0" onClick={() => SendUrl(5)}>Up Comming</Link>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}

export default CategoryList;
