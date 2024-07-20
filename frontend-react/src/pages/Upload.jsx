import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import "./Upload.css"
import Navbar from '../components/Navbar';
const firebaseConfig = {
  apiKey: "AIzaSyAAmtFu5kTBDySN7EFODMeJuAgtb__XqHU",
  authDomain: "photo-gallery-cee36.firebaseapp.com",
  projectId: "photo-gallery-cee36",
  storageBucket: "photo-gallery-cee36.appspot.com",
  messagingSenderId: "592896620255",
  appId: "1:592896620255:web:cb76f32041aa150deb5b6a"
};
import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom';
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadImageComponent = () => {
  const [files, setFiles] = useState([]);
  const [imgPreview, setImgPreview] = useState('');
  const [progress, setProgress] = useState(0);
  const [imgName, setImgName] = useState('');
  const [imgExt, setImgExt] = useState('');
  const [imageUrl , setImageUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [description , setDescription] = useState("");
  const [category, setCategory] = useState('Nature');
    const navigate = useNavigate();
  useEffect(()=>{
    async function uploadPhoto(){
        if(imageUrl)
        {
            const response = await axios.post("https://ieee-hackathon-2024-codecrafters.onrender.com/api/photo/upload-photo",{
                title: title,
                description: description,
                category: category,
                imageUrl: imageUrl

            } ,{
                headers:{
                    "Content-type" : "Application/json",
                    "token" : localStorage.getItem("token")
                }
            });
            if(response.data.message)
            {
                alert("Image uploaded successfully");
                navigate("/")
            }
            
        }
    }
    uploadPhoto();
  } , [imageUrl])
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles([selectedFile]);

    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(selectedFile);

    const name = selectedFile.name.split('.').slice(0, -1).join('.');
    const ext = selectedFile.name.split('.').pop();
    setImgName(name);
    setImgExt(ext);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const ImgToUpload = files[0];
    const ImgName = `${imgName}.${imgExt}`;
    const storageRef = sRef(storage, 'images/' + ImgName);
    const metaData = { contentType: ImgToUpload.type };
    const uploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => alert('Error: Image not uploaded'),
      () => getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {console.log(downloadURL) ; setImageUrl(downloadURL)})
    );
  };

  return (
    <>
    <Navbar></Navbar>
    <div className='h_body' >
       
      <form id="h_form" >
        <label>Image name</label>
        <input type="text" id="h_namebox" value={imgName} readOnly placeholder="(Autofilled after selecting file)" />
        <label id="h_extlab">{imgExt}</label>
        <br /><br />
        {imgPreview && <img id="h_myimg" src={imgPreview} alt="Selected"  />}
        <label id="h_upprogress">{`Uploaded ${progress} %`}</label>
        <br /><br />
        <button type="button" className="h_imgbtns" onClick={() => document.getElementById('h_fileInput').click()}>Select Image</button>
        <br /><br />
        <input type="file" id="h_fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
      </form>
      <form id="h_form2"  onSubmit={handleUpload}>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={(e)=>{setTitle(e.target.value)}}  style={{color: 'black'}} id="h_title" required />
        <br />
        <label htmlFor="description">Description</label>
        <textarea name="description" onChange={(e)=>{setDescription(e.target.value)}} id="h_description" required></textarea>
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <select name="category" id="h_category" onChange={(e)=>{setCategory(e.target.value)}} required>
          <option value="Nature">Nature</option>
          <option value="Animals">Animals</option>
          <option value="Cars">Cars</option>
          <option value="Bikes">Bikes</option>
          <option value="Sports">Sports</option>
          <option value="Art">Art</option>
          <option value="Design">Design</option>
          <option value="Crafts">Crafts</option>
          <option value="Food">Food</option>
          <option value="Quotes">Quotes</option>
          <option value="Tatoos">Tatoos</option>
          <option value="Fashion">Fashion</option>
          <option value="Decor">Decor</option>
        </select>
        <br />
        <input type="submit" id="h_submitbtn" value="Submit" />
      </form>
    </div>
    </>
  );
};

export default UploadImageComponent;
