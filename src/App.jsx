import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Root from './Router/Root'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Cart from './pages/Cart/Cart'
import Categories from './pages/Categories/Categories'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<h2>Wrong!!</h2>,
    children:[
      { path: "/",
      element: <Home />,
      
    },
    { path: "/Cart",
    element: <Cart />,
    
  },
  { path: "/Categories",
  element: < Categories/>,
},
{ path: "/Products",
element: <Products/>,
},
{ path: "/Signin",
element: <Signin/>,
},
{
   path: "/Signup",
element: <Signup/>,
},
   
    ]
  },
  
]);

function App() {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
