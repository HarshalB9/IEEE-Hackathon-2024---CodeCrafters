import React from 'react'
import "./Navbar.css"
import { loggedInSelector } from '../store/user'
import { useRecoilValue } from 'recoil'
const Navbar = () => {
  const loggedIn = useRecoilValue(loggedInSelector);
  if(loggedIn)
  {
    return (
      <div className="nav-bar">
          <div className="nav-logo">
              <img width="200px" src='../../images/final-logo.png' alt="" />
          </div>
          <div className="nav-ops">
              <button type="button" className="btn btn-warning">upload Image</button>
              <button type="button" className="btn btn-warning">login</button>
              <button type="button" className="btn btn-warning">sign Up</button>
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
              <button type="button" className="btn btn-warning">login</button>
              <button type="button" className="btn btn-warning">sign Up</button>
          </div>
         
      </div>
    )
  }
  
}

export default Navbar