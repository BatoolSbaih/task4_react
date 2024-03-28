import React, { useEffect, useState } from 'react'
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
import './Home.css'

function Home() {

  const[categories,setcategories]=useState([]);
  const getcategories=async()=>{
  const response =await fetch(`https://ecommerce-node4.vercel.app/categories`);
  const data = await response.json();
  const categorie = data.categories;
  setcategories(categorie);
}
useEffect(()=>{
  getcategories(); 
},[])

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView:3,
  spaceBetween:15,
  // If we need pagination
  pagination: {
    el:'.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
}); 
  return (
    <>

<div className="swiper pa1">
 
  <div className="swiper-wrapper">
  
    {
    categories.map( categoriee =>
    <div className="swiper-slide" key={categoriee._id}>
      <h2>{categoriee.name} </h2> 
      <img src={categoriee.image.secure_url} />
    </div>
    )
   }
    ...
  </div>

  <div className="swiper-pagination"></div>

  <div className="swiper-button-prev"></div> 
  <div className="swiper-button-next"></div> 

  <div className="swiper-scrollbar"></div> 
</div>

 </>

    
  )
  
}

export default Home