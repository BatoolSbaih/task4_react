import React, { useContext } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { UserContext } from '../../context/User';
import {Bounce, toast } from 'react-toastify';
function Navbar() {
const {userName,setUserName,setUserToken} = useContext(UserContext);
const navigate = useNavigate();

const logout=()=>{
  localStorage.removeItem('userToken');
  setUserToken(null);
  setUserName(null);
  navigate('/Signin');
}



  return (<>
  <style> 
    @import url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@400..700&family=Poppins&display=swap')
</style>


<nav className="navbar navbar-expand-lg bg-body-tertiary1 ">
  <div className="container-fluid part1">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse part1-c" id="navbarSupportedContent">
      <img src="src/pages/Navbar/img/fashonn.png" className="logo1"/>
      <span className="fashonname poppins-regular edu-nsw">Fashion Frenzy</span>
      </div>
   
   {userName?<>
    <div className="collapse navbar-collapse part1-a" id="navbarSupportedContent">

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
      <li className="nav-item">
        <NavLink className="nav-link " aria-current="page" to='/'>Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to='/Products'>Products</NavLink>
      </li>
      <li>
        <NavLink className="nav-link" to='/ProductCart'>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20px" height="20px">
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" 
            style={{ fill: 'rgb(128, 68, 0)' }}/>
        </svg>
        </NavLink>
      
      </li>
    
    </ul>
    </div>

    <div>
    <NavLink className="nav-link" to='/Logout'onClick={logout}>Logout</NavLink>
    </div>
    </>
     :
     <>
     
     <div className="collapse navbar-collapse part1-b" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
          <NavLink className="nav-link" to='/Signin'>Sign-in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Signup'>Sign-up</NavLink>
        </li>
      
      </ul>
    

    </div>
     </>
} 
    
 
  </div>
</nav>

 
</>



  
  )
}

export default Navbar