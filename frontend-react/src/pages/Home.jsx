import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "./Home.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import handleButtonOnClick from '../components/handleButtonOnClick'
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil'
import Slider from '../components/Slider'
const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const loggedIn = useRecoilValue(loggedInSelector);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllPhotos() {
      const response = await axios.get("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/getAllPhotosUnprotected");
      if (response.data.photos) {
        setPhotos(response.data.photos);
      }
    }
    getAllPhotos();
  }, [])
  useEffect(() => {
    async function getAllCategories() {
      const response = await axios.get("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/getAllCategories");
      if (response.data.categories) {
        setCategories(response.data.categories);
      }
    }
    getAllCategories();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div class="heading-on-homepage"><h1>Find a category</h1></div>
      <Slider></Slider>
      <div class="h_message"><h4>Explore</h4></div>
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
               
              </div>
            )
          }) : <></>}
        </div>
      </div>

    </>
  )
}

export default Home