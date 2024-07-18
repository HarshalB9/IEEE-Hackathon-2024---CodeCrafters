import React, { useState } from 'react'
import "./Profile.css"
import { userState } from '../store/user'
import { useRecoilState } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import handleButtonOnClick from '../components/handleButtonOnClick'
const Profile = () => {
    const navigate = useNavigate();
    const [ user , setUser] = useRecoilState(userState);
    const [photos , setPhotos] = useState([]);
    console.log(user)
    async function handleLogout(e){
        e.preventDefault();
        localStorage.removeItem("token");
        setUser({ loggedIn: false, email: '', user_id : -1,name:'' , profileImgae:'' , saved:[] });
        navigate("/");
    }
    async function getUploaded(e){
        e.preventDefault();
        const response = await axios.get("http://localhost:3000/api/photo/getAllUploadedPhotos",{
            headers:{
                "Content-type" : "Application/json",
                "token" : localStorage.getItem("token")
            }
        })
        if(response.data.photos)
        {
            setPhotos(response.data.photos)
        }
    }
    async function getSaved(e){
        e.preventDefault();
        const response = await axios.get("http://localhost:3000/api/photo/getAllSavedPhoto",{
            headers:{
                "Content-type" : "Application/json",
                "token" : localStorage.getItem("token")
            }
        })
        if(response.data.photos)
        {
            setPhotos(response.data.photos)
        }
    }
    return (
        <div>
            <div id="k_profile-bg">
                <div id="k_profile-photo">{user.name[0].toUpperCase()}</div>
                <div id="k_profile-username">@CodeCrafters</div>
                <p id="k_following-cnt">0 following</p>
                <div id="k_change">
                    <button type="button" id="k_share">Share</button>
                    <button type="button" id="k_edit-profile">Edit</button>
                </div>
                <div id="k_operate">
                    <a  id="k_created" onClick={getUploaded}>Uplaoded Images</a>
                    <a href="#" id="k_saved" onClick={getSaved}>Saved</a>
                    <button id="k_profile-logout" type="submit" onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <div class="k_profile-log"></div>

            <div className='k_k_homepage-photo-gallery'>
        <div className='k_k_homepage-photo-grid' id='k_k_homepage-photo-grid'>
          {photos ? photos.map((photo) => {
            return (
              <div className='k_k_photo-of-photo-gallery'>
                <div className='k_k_for-overlay-effect'>
                  <img src={photo.photo_url} alt="" />
                  <button type='button' className='k_k_save-button' onClick={()=>handleButtonOnClick(photo.photoId , loggedIn , localStorage.getItem('token'))}>save</button>
                  <div className='k_k_photo-overlay'></div>

                </div>
                <div className='k_k_content'>
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

export default Profile