import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Root from './Router/Root'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import Logout from './pages/Logout/Logout'
import ProtectedRoutes from "./ProtectedComponent/ProtectedRoutes"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from "./context/User.jsx";
import SendCode from "./pages/SendCode/SendCode.jsx";
import ForgetPass from "./pages/ForgetPass/ForgetPass.jsx";
import Details   from "./pages/Details/Details.jsx";
import ProductCart from './pages/ProductCart/ProductCart.jsx';
import Pagination from './pages/Pag/Pagination.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<h2>Wrong!!</h2>,
    children:[
      { path: "/",
      element: <Home />,
      
    },
    { path: "/Pagination",
    element: <Pagination />,
    
  },
    { path: "/SendCode",
    element: <SendCode/>,
    
  },
  { path: "/Details",
  element: <Details/>,
  
},
{ path: "/ProductCart",
element: <ProductCart/>,

},

  
  
  { path: "/ForgetPass",
  element: <ForgetPass/>,
  
},
    
  { path: "/Categories",
  element: < Categories/>,
},
{ path: "/Products",
element:
<ProtectedRoutes>
<Products/>
</ProtectedRoutes>
 
},
{ path: "/Signin",
element: 

<Signin/>

,
},
{
   path: "/Signup",
element: <Signup/>,
},


{
  path: "/Logout",
element: <Logout/>,
}
   
]
}]);

function App() {
  return (
    <>
    <UserContextProvider>
     <RouterProvider router={router} />
     <ToastContainer />
    </UserContextProvider></>
  )
}

export default App
