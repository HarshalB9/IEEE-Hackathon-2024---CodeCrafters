import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import InitUser from './InitUser';
function App() {
  return (
    <div>
      <InitUser></InitUser>
      <Home></Home>
    </div>
  )
}

export default App
