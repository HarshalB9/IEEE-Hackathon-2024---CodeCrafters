import React from 'react'
import "./Navbar.css"
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const loggedIn = useRecoilValue(loggedInSelector);
  const navigate = useNavigate();
  console.log(loggedIn);
  if(loggedIn)
  {
    return (
      <div className="nav-bar">
          <div className="nav-logo">
            <Link to={"/"}>
              <img width="200px" src='../../images/PicfinityLogo2.png' alt="" onClick={()=>{
                navigate("/")
              }} />
            </Link>
          </div>
          <div className="nav-ops">
          <Link to={"/upload"}>
            <button type="button" className="btn btn-warning upload" id="homebtn2"  ><span className="first-span">upload </span> <span> Image</span></button>
          </Link>
          <Link to={"/profile"}>
            <button type="button" className="btn btn-warning" id="homebtn">Profile</button>
          </Link>
          </div>
      </div>
    )
  }
  else{
    return (
      <div className="nav-bar">
          <div className="nav-logo">
              <img width="200px" src='../../images/PicfinityLogo2.png' alt="logo" />
          </div>
          <div className="nav-ops">
              <Link to={"/login"}>
                <button type="button" className="btn btn-warning" id="homebtn">login</button>
              </Link>
              <Link to={"/signup"}>
                <button type="button" className="btn btn-warning" id="homebtn">sign Up</button>
              </Link>
          </div>
         
      </div>
    )
  }
  
}

export default Navbar