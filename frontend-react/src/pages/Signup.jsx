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
    
    const response  = await axios.post('http://localhost:3000/api/user/signup', {
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
      alert("Incorrect data");
    }
  }
  return (
      <div className='k_signup-page'>
      <div id='k_img-nature'>
        <div className='k_overlay'></div>
        <img src="../../images/nature1.jpg" alt="" id='nature-img'/>
      </div>
      <div id='k_sign-up'>
        <img src="../../images/login-logo1.png" alt="" id='k_logo' />
        <div className='k_cred'>
          <input type="text" name='' id="k_username"  onChange={(e)=>setName(e.target.value)}  placeholder='Name' /><br />
          <input type="email" name="" id="k_email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" /><br />
          <input type="password" name="pass" id="k_password" onChange={(e)=>setPassword(e.target.value)} minLength={8} required placeholder="Password" />
          <input type="submit" onClick={handleSignup} id="k_submit"/>
          <Link to={"/login"}>
            <div id='k_login'>Already have an accuont Click to Login</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;
