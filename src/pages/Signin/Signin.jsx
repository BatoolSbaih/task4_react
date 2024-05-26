import axios from 'axios';
import React, { useContext, useState } from 'react';
import { object, string} from 'yup';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import './Signin.css';
import {Bounce, toast } from 'react-toastify';
import { UserContext } from '../../context/User';
import SendCode from '../SendCode/SendCode';

function Signin() {







  const {setUserToken} = useContext (UserContext);
  const navigate = useNavigate();
  const[loader,setLoader]=useState(false);
  const[errors,setErrors]=useState([]);
  const [user, setUser] = useState({
    email: '',
    password: '',
   
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
const validation =async()=>{
const LoginSchema = object({
  email:string().email().required(),
  password:string().min(8).max(20).required(),
});
try {
  await LoginSchema.validate(user,{abortEarly:false});
  return true;
} catch (error) {
  setErrors(error.errors);
  setLoader(false);
  return false;
}

}; 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(await validation()){
      try{
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user);
    setUser({
      email: '',
      password: '',
    });
    
    if(data.message == 'success'){
      toast.success('Login Successfly !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark",
        transition:Bounce,
        });
        localStorage.setItem('userToken',data.token);
         setUserToken(data.token);
         navigate('/');
      }
  
  }catch (error) {
    
      toast.warn(error.response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition:Bounce,
        });
   
   }finally{
    setLoader(false);
   }
   
  }}
   
 ;

     
      
  return (<>
    <div className='pagesignin'>
    <div className="container pagesignin1">
      <div className="sign-part1">
        
        <h2 className='edu-nsw Welcome'>Fashion Frenzy</h2>
        <h5 className='edu-nsw Welcome'>Lets get started!</h5>
        <span className="Welcomespan">Discover a world of elegance.</span>
        <span className='edu-nsw Account'>don't Have a Account?</span>
        <div className='gotosignup'>
        <NavLink className="nav-link" to='/Signup'>Sign-up</NavLink>
        </div>
       


      </div>
      <div className="sign">

      <form onSubmit={handleSubmit}>
    
    <label>Email</label>
    <input type="email" name="email" value={user.email} onChange={handleChange}/>

    <label>Password</label>
    <input type="password" name="password" value={user.password} onChange={handleChange}/>
<div className='forget'>
<NavLink className='forgetPassword edu-nsw' to={`/SendCode/?email=${user.email}`}>Forget Password?</NavLink>
</div>
   

    <button  type='submit' className='btn  btn-outline-success butt2 btnnn' disabled={loader?'disabled':''}>{!loader?'Sign-in':'wait..'}</button>
    </form>
      </div>
    
    </div>
    
    </div>
    
    </>
  )
}

export default Signin