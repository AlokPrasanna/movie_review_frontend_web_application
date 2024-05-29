import React, { useEffect, useState } from 'react';
import { useApiContext } from '../ApiContex/ApiContext';
import { useApiContextTitle } from '../ApiConetexTitle/ApiContexTitle';
import { Link } from 'react-router-dom';
import '../../Style/MenuLink.scss';
const Key = localStorage.getItem('TMDBKey');

function MenuLink(props) {
  const {setContextData} = useApiContext();
  const {setContextTitleData} = useApiContextTitle();

  const [DataId,setDataId] = useState(null);
  
  //console.log("Props data Id val: ", DataId);
  //console.log("Props url: ", props.url);
  //console.log("Type of DataIdInt: ",typeof(DataIdInt));
  //console.log("props dataID: ", DataIdInt);
  
  useEffect(() => {
    setDataId(props.dataId);
    console.log(props.dataId);
  }, [props.dataId]);

  useEffect(() => {
    if (DataId !== null) {
      const DataIdInt = parseInt(DataId ,10);
      SendData(DataIdInt);
    }
  }, [DataId]);

  const SendData = (SendId) =>{
   console.log("props dataID: ", SendId);
    if(SendId === 1){
      setContextData();
      setContextTitleData("Top Rated");
    }else if(SendId === 2){
      setContextData(`https://api.themoviedb.org/3/movie/popular?api_key=${Key}`);
      setContextTitleData("Popular");
    }else if(SendId === 3){
      setContextData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${Key}`);
      setContextTitleData("Now Playing");
    }else if(SendId === 4){
      setContextData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${Key}`);
      setContextTitleData("Up Comming");
    }else{
      setContextData("Non");
      setContextTitleData("Request Error");
    }
  }

  return (
    <div className='menu-link'>
      <Link to={props.url}  >{props.LinkName}</Link>
    </div>
  );
}

export default MenuLink;
