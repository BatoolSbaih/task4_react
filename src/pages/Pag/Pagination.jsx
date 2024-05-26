import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Ensure you import Link
import './Pagination.css';

export default function Pagination() {
    let [products, setProducts] = useState([]);
    let [page, setPage] = useState(1);
    let [limit, setLimit] = useState(3);
    let [loading, setLoading] = useState(true);
    let [total, setTotal] = useState(0);

    const getPagination = async (Page = 1, limit = 3) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${Page}&limit=${limit}`);
            setProducts(data.products);
            setTotal(data.total);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPagination(page, limit);
    }, [page, limit]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > Math.ceil(total / limit)) return;
        setPage(newPage);
    };

    return (
        <>
            {loading === false ? (
                <div className="main-Pag">
                    <div className="Pag-Main" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {products.map(product => (
                            <div className="card" style={{ width: '300px', flex: '1 1 auto' }} key={product.id}>
                                <img className="card-img-top" style={{ height: '200px' }} src={product.mainImage.secure_url} alt="Card image cap" />
                                <div className="card-body cards">
                                <div>  <h6>{product.name}</h6></div> 
                                    <div>
                                        <span>Price : {product.price}$</span><br/><br/>
                                        <span>Final Price :{product.finalPrice}$</span>
                                    </div>
                                    <div>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className={index < product.avgRating ? 'filled' : 'empty'}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <div >
                                        <Link to={`/Details/?product_id=${product.id}`}><button className=' buttondetail'>Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(page - 1)}>
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {[...Array(Math.ceil(total / limit)).keys()].map(i => (
                                <li className={`page-item ${page === i + 1 ? 'active' : ''}`} key={i + 1}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </a>
                                </li>
                            ))}
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(page + 1)}>
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
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
