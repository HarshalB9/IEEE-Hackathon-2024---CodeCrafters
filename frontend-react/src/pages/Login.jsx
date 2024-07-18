import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../store/user';
import "./Login.css"
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const loggedIn = useRecoilValue(loggedInSelector);
  if(loggedIn)
  {
    navigate("/")
  }
  const [email , setEmail] = useState(null);
  const [password , setPassword] = useState(null);
  const [user, setUser] = useRecoilState(userState);
  async function handleLogin(e){
    e.preventDefault();
    
    const response  = await axios.post('http://localhost:3000/api/user/login', {
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
      setUser({ loggedIn: true, email: email, user_id : response.data.user_id,name: '' , profileImgae:'' , saved:[] });
      localStorage.setItem("token" , response.data.token);
      window.location.href = "/"
    }
    else{
      alert("Incorrect data");
    }
  }
  return (
    <div className='login-page'>
      <div id='img-nature'>
        <div className='overlay'></div>
        <img src="../../images/nature1.jpg" alt="" id='nature-img' />
      </div>
      <div id='login'>
        <img src="../../images/login-logo1.png" alt="" id='image-in-login'/>
        <div className='cred'>
            <input style={{color : 'black'}} type="email" id='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
            <br />
            <input type="password" name='pass' style={{color : 'black'}}  onChange={(e)=>setPassword(e.target.value)} id='password' minLength={8} required placeholder='Password'  />
            <div id='forget'>Forget Password?</div>
            <input type="submit" onClick={handleLogin} id='submit' />
            <Link to={"/signup"}>
              <div  id='sign-up'>Don't Have an account Click to Signup</div>

            </Link>
        </div>
      </div>
    </div>
  )
}

export default Login