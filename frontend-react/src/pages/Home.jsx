import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "./Home.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllPhotos() {
      const response = await axios.get("http://localhost:3000/api/photo/getAllPhotosUnprotected");
      if (response.data.photos) {
        setPhotos(response.data.photos);
      }
    }
    getAllPhotos();
  }, [])
  useEffect(() => {
    async function getAllCategories() {
      const response = await axios.get("http://localhost:3000/api/photo/getAllCategories");
      if (response.data.categories) {
        setCategories(response.data.categories);
      }
    }
    getAllCategories();
  }, []);
  
  return (
    <>
      <Navbar></Navbar>
      <div className="heading-on-homepage">
        <h1>Welcome to Our Photo Gallery</h1>
      </div>
      <div className="catagory-container">
        {categories ? categories.map((category,index)=>{
          return(
            <div className="catagory" onClick={()=>{
              navigate("/category/"+category);
            }}>
              <h3>{category}</h3>
              <div className="overlay"></div>
            </div>
          )
        }) : <></>}
      </div>
      <div className="h_message"><h4>Explore our Gallery</h4></div>
      <div className='homepage-photo-gallery'>
        <div className='homepage-photo-grid' id='homepage-photo-grid'>
          {photos ? photos.map((photo) => {
            return (
              <div className='photo-of-photo-gallery'>
                <div className='for-overlay-effect'>
                  <img src={photo.photo_url} alt="" />
                  <button type='button' className='save-button'>save</button>
                  <div className='photo-overlay'></div>

                </div>
                <div className='content'>
                  <h2>{photo.title}</h2>
                  <p>{photo.description}</p>
                  <p id='category'>{photo.category}</p>
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