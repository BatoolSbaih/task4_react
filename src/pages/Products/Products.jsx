import React, { useEffect, useState } from 'react';
import './products.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../Pag/Pagination';

function Products() { 
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productsCate, setProductsCate] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('product_id');
  const limit = urlParams.get('limit=10');
  const [loading, setLoading] = useState(true);
 
  const getProducts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
    const data = await response.json();
    const productss = data.products;
    console.log(productss);
    setLoading(false);
    setProducts(productss);
  }

  const getProductsCategorie = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
    const data = await response.json();
    const productss = data.products;
    console.log(productss);
    setProductsCate(productss);
    setLoading(false);
  }

  useEffect(() => {
    getProducts(); 
    getProductsCategorie();
  }, []);

  const addToCart = async (id) => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
      productId: id
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
  };

  return (
    <>
      {loading === false ? (
        <div className='partall'>
          <div className='container parta'>
            <div className='ourProducts edu-nsw'> Our Products</div>
            <div className='part2'>
            {!id ? (
  <Pagination />
) : (
  <>
    {products.length === 0 ? (
      <p className='noProduc'>No products available.</p>
    ) : (
      <>
        {products.map(product => (
          <div className='part2cart' key={product._id}>
            <img src={product.mainImage.secure_url} alt={product.name} />
            <div className='produtName'>
              <h5>{product.name}</h5>
            </div>
            <div className='buttAdd' >
                                        <Link to={`/Details/?product_id=${product.id}`}><button className=' buttondetail'>Details</button></Link>
                                    </div>
          </div>
        ))}
      </>
    )}
  </>
)}

      
            </div>
          </div>
        </div>
      ) : (
        <div className="loading w-100 vh-100 z-3">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

export default Products;
