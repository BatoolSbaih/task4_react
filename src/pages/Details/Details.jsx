import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Details.css';
import { FaStar } from "react-icons/fa";
function Details() {
  const [details, setDetails] = useState(null); // Change initial state to null for better conditional rendering
  const [mainImage, setMainImage] = useState(''); // State for the main image
  const[loader,setLoader]=useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('product_id');

  const getCategoriesDetails = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setDetails(data.product);
      setMainImage(data.product.mainImage.secure_url); // Set the initial main image
      console.log(data.product);
      setLoader(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const addToCart =async(id)=>{
    const token = localStorage.getItem('userToken');
    const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
      productId:id
    },{
      headers:{
        Authorization:`Tariq__${token}`
      }
    });
    console.log(data);
  };
  useEffect(() => {
    if (id) {
      getCategoriesDetails();
    }
  }, [id]);


  return (<>
    {loader==false?
  <section className='MainBodyInDetails'>

    <div className="main_details">
      <div className="main_detailsChild">
        <div className="main_detailsChildOne">
          <div className="mainImg">
            <img src={mainImage} className="main-img img-fluid" alt="Main" />
          </div>
          <div className='Imgs' >
          <img 
            src={details.mainImage.secure_url} 
            className="sub-img img-fluid rounded-5 me-3" 
            alt="Thumbnail" 
            onClick={() => setMainImage(details.mainImage.secure_url)} 
          />
        
          {details.subImages.map((img) => (
            <img 
              src={img.secure_url} 
              className="sub-img img-fluid rounded-5 me-3" 
              alt="Thumbnail" 
              key={img.public_id} 
              onClick={() => setMainImage(img.secure_url)} 
            />
          ))}
          </div>
          
        </div>
        <div  className="main_detailsChildTwo">
          <div className='main_Two'>
          <h5 className='H1D'>{details.name}</h5>
          <br />
          <p className='PD'> {details.description}</p>
          <span className='SpanD'> Price : {details.price}$</span>
          <br />
          <span className='SpanD'>Price After discount : {details.finalPrice}$</span>
          <br/>
          <div className='buttAdd BtnDetaise'>
        <button onClick={()=>addToCart(details._id)}>Add To Cart</button>
        </div>
          </div>
          
        </div>
      </div>  

    </div>
    <section className='sec-det'>
      <div className='review p-5 border-2 border-black' style={{ width: '100%' }}>
        <div className="title text-center position-relative">
          <div className="d-flex justify-content-center align-items-center">
            <h2 className='text-dark black'>Reviews</h2>
            <span className="position-absolute fs-3">Avg rating And Feedback</span>
          </div>
        </div>
        <h1 className='text-center py-4'> </h1>
        <div className="reviews-grid">
          {details.reviews.map((review) => (
            <div className=' border border-3 border-black p-5 mt-2  RV' key={review._id}>
              <h6>{review.createdBy.userName}</h6>
              <p>{review.comment}</p>
              {[...Array(5)].map((star, index) => (
                <FaStar
                  size={20}
                  color={index < review.rating ? '#ffc107' : '#e4e5e9'}
                  key={index}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  
  
  </section>
  :
  <div className='loading w-100   vh-100 z-3'>
  <span className="loader "></span>
  </div>
  }

</>
  );
}

export default Details;
