import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { photoState } from '../store/photo';
import { loggedInSelector } from '../store/user';
import { useRecoilValue } from 'recoil';
import handleButtonOnClick from '../components/handleButtonOnClick';
import { useNavigate } from 'react-router-dom';
import "./Photo.css";
import Navbar from "../components/Navbar"
const Photo = () => {
    const navigate = useNavigate();
    const { photoId } = useParams();
    const [photoS, setPhotoS] = useRecoilState(photoState);
    
    const [ourPhoto, setOurPhoto] = useState({});
    const loggedIn = useRecoilValue(loggedInSelector);
    useState(() => {
        
        console.log("photo jsx loaded" + photoId);
        console.log(photoS);
        for (var i = 0; i < photoS.length; i++) {
            if (photoS[i].photoId == photoId) {
                setOurPhoto(photoS[i]);
            }
        }

    }, [photoId, photoS])
    return (
        <div className=''>
            <Navbar></Navbar>
            {ourPhoto ? (
                <div className='hero-class'>

                    <div className='imgchadiv'>
                        <img src={ourPhoto.photo_url} alt="" />
                        
                        {/* <div className='photo-overlay'></div> */}
                    </div>
                    <div className='descchadiv'>
                        <div><h1>{ourPhoto.title}</h1></div>
                        <div><p>{"Description: " + ourPhoto.description}</p></div>
                        <div><p>{"Category: " + ourPhoto.category}</p></div>
                    </div>
                </div>
            ) : <div>hithere</div>}
        </div>
    )
}

export default Photo