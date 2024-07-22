import React, { useState } from 'react'
import "./Profile.css"
import { userState } from '../store/user'
import { useRecoilState } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil'
import {useEffect} from 'react';

const Profile = () => {
    const loggedIn = useRecoilValue(loggedInSelector);
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [photos, setPhotos] = useState([]);
    const [uploaded , setUploaded] = useState(true);
    
    console.log(user)
    async function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        setUser({ loggedIn: false, email: '', user_id: -1, name: '', profileImgae: '', saved: [] });
        navigate("/");
    }
    async function getUploaded(e) {
        e.preventDefault();
        console.log("gettting uploaded");
        const response = await axios.get("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/getAllUploadedPhotos", {
            headers: {
                "Content-type": "Application/json",
                "token": localStorage.getItem("token")
            }
        })
        if (response.data.photos) {
            setPhotos(response.data.photos);
            setUploaded(true);
        }
    }
    async function getSaved(e) {
        e.preventDefault();
        console.log("getting saved");
        const response = await axios.get("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/getAllSavedPhoto", {
            headers: {
                "Content-type": "Application/json",
                "token": localStorage.getItem("token")
            }
        })
        if (response.data.photos) {
            setPhotos(response.data.photos);
            setUploaded(false);
        }
    }
    useEffect(()=>{
        async function dostuff(){
            const response = await axios.get("https://ieee-hackathon-2024-codecrafters.onrender.com/api/photo/getAllSavedPhoto", {
                headers: {
                    "Content-type": "Application/json",
                    "token": localStorage.getItem("token")
                }
            })
            if (response.data.photos) {
                setPhotos(response.data.photos);
                setUploaded(false);
            }
        }
        dostuff();
    } , []);
    async function handleButtonOnClickDelete(photo_id , loggedIn ,token ){
        console.log("handle button clicked");
        if(!loggedIn)
        {
            // window.location.href = "/login";
            alert("Please login first")
        }
        console.log(photo_id);
        console.log(token);
        const response = await axios.delete("https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/photo/deleteAPhoto",{
            headers :{
                "Content-type" : "Application/json",
                token : token,
                "photo_id" : photo_id
            }
        })
        console.log(response.data)
        if(response.data.deleted)
        {
            const updatedPhotos = photos.filter((photo) => photo.photoId !== photo_id);
            setPhotos(updatedPhotos);
            setUser(user);
            alert('Photo deleted');
        }
        else{
            alert("problem")
        }
    }
    return (
        <>
        <Navbar></Navbar>
        <br /><br />
        <div>
            <div id="k_profile-bg">
                <div id="k_profile-photo">{user.name[0].toUpperCase()}</div>
                {/* <div id="k_profile-username">@CodeCrafters</div> */}
                <div id="k_profile-username">{user.name}</div>
               
                {/* <p id="k_following-cnt">0 following</p> */}
                {/* <div id="k_change">
                    <button type="button" id="k_share">Share</button>
                    <button type="button" id="k_edit-profile">Edit</button>
                </div> */}
                <div id="k_operate">
                    <a id="k_created"  onClick={getUploaded}>My Uploads</a>
                    <a href="#" id="k_saved" onClick={getSaved}>Saved</a>
                    <button id="k_profile-logout" type="submit" onClick={handleLogout}>Log out</button>
                </div>
            </div>
            <div class="k_profile-log"></div>

            <div className='homepage-photo-gallery'>
                <div className='homepage-photo-grid' id='homepage-photo-grid'>
                    {photos ? photos.map((photo) => {
                        return (
                            <div className='photo-of-photo-gallery'>
                                <div className='for-overlay-effect'>
                                    <img src={photo.photo_url} alt="" />
                                    { uploaded ? (<button type='button' className='save-button' onClick={() => handleButtonOnClickDelete(photo.photoId, loggedIn, localStorage.getItem('token') )} >Delete</button>) : <></>}
                                    <div className='photo-overlay'></div>
                                </div>
                                
                            </div>
                        )
                    }) : <></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile