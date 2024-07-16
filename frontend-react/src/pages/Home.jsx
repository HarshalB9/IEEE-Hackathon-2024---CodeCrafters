import React from 'react'
import Navbar from '../components/Navbar'
import "./Home.css"
const Home = () => {
  return (
    <>
        <Navbar></Navbar>
        <div className="heading-on-homepage">
          <h1>Welcome to Our Photo Gallery</h1>
        </div>
        <div className="catagory-container">
      
          <div className="catagory"><h3>Animal</h3> <div className="overlay"> <button type="button" className="save-button">upload Image</button></div></div>
          <div className="catagory"><h3>Travel</h3> <div className="overlay"></div></div>
          <div className="catagory"><h3>Travel</h3> <div className="overlay"></div></div>
          <div className="catagory"> <h3>Travel</h3><div className="overlay"></div></div>
          <div className="catagory"><h3>Travel</h3> <div className="overlay"></div></div>
          <div className="catagory"><h3>Travel</h3> <div className="overlay"></div></div>
          <div className="catagory"> <h3>Travel</h3><div className="overlay"></div></div>
          <div className="catagory"> <h3>Travel</h3><div className="overlay"></div></div>
        </div>
        <div className="h_message"><h4>Explore our Gallery</h4></div>
        <div className="homepage-photo-gallery">
            <div className="homepage-photo-grid" id="homepage-photo-grid">
              <div className='photo-of-photo-gallery'>
                <img src="https://firebasestorage.googleapis.com/v0/b/eduswap2-1cffe.appspot.com/o/images%2Fphy.jpg?alt=media&token=bd6899d3-8914-4fb7-863c-7803ba33e506" alt="" />
              </div>
            </div>
      </div>
    </>
  )
}

export default Home