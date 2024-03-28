import React from 'react'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import { Outlet } from 'react-router-dom'
function Root() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default Root