import React from 'react'
import "./Navbar.css"
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const loggedIn = useRecoilValue(loggedInSelector);
  console.log(loggedIn);
  if(loggedIn)
  {
    return (
      <div className="nav-bar">
          <div className="nav-logo">
            <Link to={"/"}>
              <img width="200px" src='../../images/final-logo.png' alt="" />
            </Link>
          </div>
          <div className="nav-ops">
          <Link to={"/upload"}>
            <button type="button" className="btn btn-warning">upload Image</button>
          </Link>
          <Link to={"/profile"}>
            <button type="button" className="btn btn-warning">Profile</button>
          </Link>
          </div>
      </div>
    )
  }
  else{
    return (
      <div className="nav-bar">
          <div className="nav-logo">
              <img width="200px" src='../../images/final-logo.png' alt="" />
          </div>
          <div className="nav-ops">
              <Link to={"/login"}>
                <button type="button" className="btn btn-warning">login</button>
              </Link>
              <Link to={"/signup"}>
                <button type="button" className="btn btn-warning">sign Up</button>
              </Link>
          </div>
         
      </div>
    )
  }
  
}

export default Navbar