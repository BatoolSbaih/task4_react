import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
function ForgetPass() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '',
    password:'' ,code:''});
   
    const handleChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const requestBody = {
          email: user.email,
          password:user.password,
          code: user.code, 
        };
       const {response} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, requestBody);
   
        if (user.code == "page not found") {
          console.log("Password reset successful!");
        } else {
          console.log("Error:", data.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
  return (
    <div className='SendMain'>
    <div className="SendC">
      <form onSubmit={handleSubmit}>
      <div className='Forg'  ><p>Please, Enter your Email to receive the password reset code</p></div>
      <div className='Forg' ><span>Email</span>  <input type="email" name="email" value={user.email} onChange={handleChange} /></div>
      <div className='Forg' > <span>Password</span> <input type="password" name="password" value={user.password} onChange={handleChange} /></div>
      <div className='Forg' ><span>Code</span> <input type="text" name="code" value={user.code} onChange={handleChange} /></div>
      <div><button type="submit"  className='BtnSend'>Submit</button></div>
    </form>
    </div>
    </div>
    
  )
}

export default ForgetPass