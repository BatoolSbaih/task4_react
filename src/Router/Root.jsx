import React from 'react'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './Root.css'

function Root() {
  return (
    <div className='Mainn'>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default Root