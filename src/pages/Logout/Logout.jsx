import React from 'react'
import './Logout.css'
import {Link} from 'react-router-dom'
function Logout() {
  return (
   <>
   

   <div className="bodyy">
          <div className="hero container ">
            <div className="log-part2 p-3">
              <img src="src/pages/Logout/img/image.png" alt="Fashion" />
            </div>
            <div className=" log-part1">
              <h4 className=" Welcome"> Welcome to Fashion Frenzy</h4>
              <span className="Welcomespan">Discover a world of elegance.</span>

              <div className='twobutp'>
  
 <button className="btn2"><Link className="nav-link" to='/Signin'>Sign-in</Link></button> 
 <button className="btn2">  <Link className="nav-link" to='/Signup'>Sign-up</Link></button> 



    </div>
            </div>
         
          </div>


    </div>
   
   
   
   
   
   
   
   
   </>
  )
}

export default Logout