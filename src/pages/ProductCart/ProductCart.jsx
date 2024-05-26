import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./productCart.css";
import './loader.css';

function ProductCart() {
  const navigate = useNavigate();
  const [productsCart, setProductsCart] = useState([]);
  const [loader, setLoader] = useState(true);

  const getCart = async () => {
    const token = localStorage.getItem('userToken');
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    setProductsCart(data.products);
    setLoader(false);
  };

  useEffect(() => {
    getCart();
  }, []);

  const getRemoveItem = async (id) => {
    setLoader(true);
    const token = localStorage.getItem('userToken');
    await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
      productId: id
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    getCart();
  };

  const getDecreaseProduct = async (id) => {
    setLoader(true);
    const token = localStorage.getItem('userToken');
    await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
      productId: id
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    getCart();
  };

  const getIncreaseProduct = async (id) => {
    setLoader(true);
    const token = localStorage.getItem('userToken');
    await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
      productId: id
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    getCart();
  };

  const getClearCart = async () => {
    setLoader(true);
    const token = localStorage.getItem('userToken');
    await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {}, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    getCart();
  };

  return (
    <>
      {loader === false ?
        <div className="usersTabel col">
            <div className='ourProducts edu-nsw'> Cart</div>
          <table className="table table-striped" border={6}>
            <thead>
              <tr>
                <th scope="col" className="text-center th1">Product</th>
                <th scope="col" className="text-center">Quantity</th>
                <th scope="col" className="text-center">Price</th>
                <th scope="col" className="text-center">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {productsCart.map(product =>
                <tr key={product.productId}>
                  <td>
                    <div className='productdetails d-flex '>
                      <div className='col-3 col text-center'>
                        <img className='product_img col-6' src={product.details.mainImage.secure_url} alt={product.details.name} />
                      </div>
                      <div className="d-flex flex-column text-xs col text-center">
                        <span className='text-xs'>{product.details.name}</span>
                        <Link className='nav-link' onClick={() => getRemoveItem(product.productId)}><span className='text-xs text-secondary'> X  Remove</span></Link>
                      </div>
                    </div>
                  </td>
                  <td className="text-center quantity">
                    <div className="buttons">
                      <button  className="btn btn-outline-dark" onClick={() => getDecreaseProduct(product.productId)}>-</button>
                      <span> {product.quantity} </span>
                      <button  className="btn btn-outline-dark" onClick={() => getIncreaseProduct(product.productId)}>+</button>
                    </div>
                  </td>
                  <td className="text-center">{product.details.price}</td>
                  <td className="text-center">{product.details.price * product.quantity}</td>
                </tr>
              )}
              <tr>
                <td className="text-center" colSpan={4}>
                  <div className="ClearCart">
                    <button type="button" className="btnClear" onClick={getClearCart}>Clear Cart</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        :
        <div className='loading w-100 vh-100 z-3'>
          <span className="loader"></span>
        </div>
      }
    </>
  );
}

export default ProductCart;
