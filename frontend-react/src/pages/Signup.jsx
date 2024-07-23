import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css"
import { userState } from '../store/user';
import { useRecoilState } from 'recoil';
import { loggedInSelector } from '../store/user';
import { useRecoilValue } from 'recoil';
import axios from "axios"
const Signup = () => {
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(loggedInSelector);
  if(loggedIn)
  {
    navigate("/")
  }
  const [name , setName] = useState(null);
  const [email , setEmail] = useState(null);
  const [password , setPassword] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  async function handleSignup(e){
    e.preventDefault();
    
    const response  = await axios.post('https://ieee-hackathon-2024-codecrafters-1.onrender.com/api/user/signup', {
      name,
      email,
      password
        }, 
        {
          headers: {
                'Content-Type': 'application/json',
            }
      });
    console.log(response.data)
    if(response.data.token)
    {
      console.log("User signed up");
      setUser({ loggedIn: true, email: email, user_id : response.data.user_id,name: name , profileImgae:'' , saved:[] });
      localStorage.setItem("token" , response.data.token);
      window.location.href = "/"
    }
    else{
      alert(response.data.message);
    }
  }
  return (
      <div className='s_signup-page'>
      <div id='s_img-nature'>
        <div className='s_overlay'></div>
        {/* <img src="../../images/nature1.jpg" alt="" id='s_nature-img'/> */}
        <img src="../../images/colorful.png" alt="" id='s_nature-img'/>
      </div>
      <div id='s_sign-up'>
        {/* <img src="../../images/login-logo1.png" alt="" id='s_logo' /> */}
        <img src="../../images/PicfinityLogowhite.png" alt="" id='s_logo' />
        <div className='s_cred'>
          <input type="text" name='' id="s_username" style={{color : "black"}} onChange={(e)=>setName(e.target.value)}  placeholder='Name' /><br />
          <input type="email" name="" id="s_email" style={{color : "black"}} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" /><br />
          <input type="password" name="pass" id="s_password" style={{color : "black"}} onChange={(e)=>setPassword(e.target.value)} minLength={8} required placeholder="Password" />
          <input type="submit" onClick={handleSignup} id="s_submit"/>
          <Link to={"/login"} style={{ textDecoration: 'none' }}>
            <div id='s_login'>Already have an accuont? Click to Login</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;
