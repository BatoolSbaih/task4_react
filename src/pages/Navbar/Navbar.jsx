import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
 
  <><nav className="navbar navbar-expand-lg bg-body-tertiary1 partnav">
  <div className="container-fluid part1">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse part1-a" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Products'>Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Cart'>Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Categories'>Categories</NavLink>
        </li>
      
      </ul>
      
    </div>
    <div className="collapse navbar-collapse part1-b" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
          <NavLink className="nav-link" to='/Signin'>Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Signup'>Signup</NavLink>
        </li>
      
      </ul>
    

    </div>
  </div>
</nav>
</>



  
  )
}

export default Navbar