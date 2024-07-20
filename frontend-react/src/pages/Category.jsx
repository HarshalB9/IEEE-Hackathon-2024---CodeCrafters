import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./Home.css"
import handleButtonOnClick from '../components/handleButtonOnClick';
const Category = () => {
  const { category} = useParams();
  const [photos, setPhotos] = useState([]);
  useEffect(()=>{
    // getPhotosByCategory
    async function getPhotos(){
        const response = await axios.get("http://localhost:3000/api/photo/getPhotosByCategory",{
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
                  <div className='photo-overlay'></div>

                </div>
                <div className='description-div'>
                  <h2>{photo.title}</h2>
                  <p>{photo.description}</p>
                  <p id='category'>{photo.category}</p>
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