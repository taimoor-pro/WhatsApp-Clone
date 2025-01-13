import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

const App = () => {
  return (
    <div className='dark'>
      <Router>
        <Routes>
          <Route exect path="/" element={<Home />} />
          <Route exect path="/login" element={<Login />} />
          <Route exect path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
