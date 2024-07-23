import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { photoState } from '../store/photo';
import { loggedInSelector } from '../store/user';
import { useRecoilValue } from 'recoil';
import handleButtonOnClick from '../components/handleButtonOnClick';
import { useNavigate } from 'react-router-dom';
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
            {ourPhoto ? (
                <div className=''>

                    <div className='for-overlay-effect'>
                        <img src={ourPhoto.photo_url} alt="" />
                        <button type='button' className='save-button' onClick={() => handleButtonOnClick(ourPhoto.photoId, loggedIn, localStorage.getItem('token'))} >save</button>
                        <div className='photo-overlay'></div>
                    </div>
                    <div>
                        <h1>{ourPhoto.title}</h1>
                        <p>{ourPhoto.description}</p>
                        <p>{ourPhoto.category}</p>
                    </div>
                </div>
            ) : <div>hithere</div>}
        </div>
    )
}

export default Photo