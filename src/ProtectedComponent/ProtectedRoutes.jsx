import React from 'react'
import {Link, NavLink, useNavigate,Navigate} from 'react-router-dom';
function ProtectedRoutes({children}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  if(!token){
    return <Navigate to ='/Signin' replace/>
  }
  
  return children;
    
  
}

export default ProtectedRoutes