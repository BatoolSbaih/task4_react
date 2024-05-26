import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './SendCode.css'
const SendCode = () => {
  const[loader,setLoader]=useState(true);
    const navigate = useNavigate();
  const [user, setUser] = useState({ email: '',
  password: '' });
 
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        email: user.email,
        password:"11111111",
        code: "0Z7d" 
      };

        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, 
        {email: user.email});
         

           console.log(data);
      navigate('/ForgetPass');
      if (data.message == "page not found") {
        console.log("Password reset successful!");
      } else {
        console.log("Error:", data.data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>

     <div className='SendMain'>

<div className="SendC">

<form onSubmit={handleSubmit}>
  <div><p>Please, Enter your Email to receive the password reset code!</p></div>
  <div><input type="email" name="email" value={user.email} onChange={handleChange} /></div>
  <div><button   type="submit" className='BtnSend' >Send Code</button></div>
</form>
</div>
    </div>
  
    
    </>
   
  
  );
}

export default SendCode;




















