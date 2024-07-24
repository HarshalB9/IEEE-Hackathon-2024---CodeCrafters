import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loggedInSelector } from '../store/user';
import { useRecoilValue } from 'recoil';
import "./Home.css"
import handleButtonOnClick from '../components/handleButtonOnClick';
import { Link } from 'react-router-dom';
const Category = () => {
  const { category} = useParams();
  const [photos, setPhotos] = useState([]);
  const loggedIn = useRecoilValue(loggedInSelector);
  useEffect(()=>{
    // getPhotosByCategory
    async function getPhotos(){
        const response = await axios.get("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/getPhotosByCategory",{
            headers:{
                "Content-Type":"application/json",
                "category" : category
            }
        });
        if(response.data.photos){
            setPhotos(response.data.photos);
        }
    }
    getPhotos();
  } , [])
  return (
    <div>
        <Navbar></Navbar><br /><br /><br />
        <div className='homepage-photo-gallery'>
        <div className='homepage-photo-grid' id='homepage-photo-grid'>
          {photos ? photos.map((photo) => {
            return (
              <div className='photo-of-photo-gallery'>
                <div className='for-overlay-effect'>
                  <img src={photo.photo_url} alt="" />
                  <button type='button' className='save-button' onClick={()=>handleButtonOnClick(photo.photoId , loggedIn , localStorage.getItem('token'))} >save</button>
                  <Link to={`/photo/${photo.photoId}`}><div className='photo-overlay'></div></Link>

                </div>
               
              </div>
            )
          }) : <></>}
        </div>
      </div>
    </div>
  )
}

export default Category;