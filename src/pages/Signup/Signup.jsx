import axios from 'axios';
import React, { useState } from 'react';
import { object, string} from 'yup';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {Bounce, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
    const[errors,setErrors]=useState([]);
    const[loader,setLoader]=useState(false);
    const [user, setUser] = useState({
        userName:'',
        password: '',
        email: '',
        image: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        });
      };
       
      const handleImageChange = (e) => {
        const { name, files } = e.target;
       
          setUser({
            ...user,
            [name]: files[0]
          });
        
      };
      const validation =async()=>{
      const RejisterSchema =  object({
          userName:string().min(8).max(20).required(),
          email:string().email(),
          password:string().min(8).max(20).required(),
          image:string().required(),

        });
        try {
          await RejisterSchema.validate(user,{abortEarly:false});
          return true;
        } catch (error) {
          setErrors(error.errors);

          setLoader(false);
          return false;
        }
        }; 
        
      const handleSubmit = async (e) => {
    
        e.preventDefault();
        setLoader(true);
        
       
       try {
        const formData = new FormData();
        formData.append('userName',user.userName);
        formData.append('password', user.password);
        formData.append('email', user.email);
        formData.append('image', user.image);
        
         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
          console.log(data);
          setUser({
            userName:'',
            password: '',
            email: '',
            image: '',
          });
        if(data.message == 'success'){
          toast.success('Account created Successfully !', {
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
            navigate('/');
        }
       } 
       catch (error) {
        if(error.response.status === 409){
          toast.warn('Email Already Exists !', {
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
           
        }
       }finally{
        setLoader(false);
       }
       
        }

       
     ;
      
  return (
    <>
     {errors.length >0?errors.map(error=>
    <P>{error}</P>
    ):''}
     <div className='pagesignin'>
    <div className='container pagesignin1'>
      <div className="sign-part1">
        
        <h2 className='edu-nsw Welcome'>Fashion Frenzy</h2>
        <h5 className='edu-nsw Welcome'>Lets get started!</h5>
        <span className="Welcomespan">Discover a world of elegance.</span>
        
        <span className='edu-nsw Account'>Already have an account?</span>
        <div className='gotosignup'>
        <NavLink className="nav-link" to='/Signin'>Sign-in</NavLink>
        </div>

    
      </div>
      <div className="sign">

      <form onSubmit={handleSubmit}>
      <label>Your Name</label>
        <input type="text" name="userName" value={user.userName} onChange={handleChange} />
    
    <label>Email</label>
    <input type="email" name="email" value={user.email} onChange={handleChange} />

    <label>Password</label>
    <input type="password" name="password" value={user.password} onChange={handleChange}/>
    
    <label>Your Image</label>
        <input type="file" name="image" onChange={handleImageChange}/>

    <button type='submit' className='btn btn-outline-success' disabled={loader?'disabled':''}>{!loader?'Sign-up':'wait..'}</button>
    </form>
      </div>
    
    </div>

    
    </div>
   
    </>
  )
}

export default Signup