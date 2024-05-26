import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  const [loader, setLoader] = useState(true);
  const [categories, setcategories] = useState([]);

  const getcategories = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
    const data = await response.json();
    const categorie = data.categories;
    setcategories(categorie);
    setLoader(false);
  };

  useEffect(() => {
    getcategories();
  }, []);

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      direction: 'horizontal',
      loop: true,
      slidesPerView: 3,
      spaceBetween: 15,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay:2000,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      centeredSlides: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }, [categories]);

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Edu+NSW+ACT+Foundation:wght@400..700&display=swap');
      </style>
      {loader === false ? (
        <div className="bodyy">
          <div className="hero container">
            <div className="hero-part2">
              <img src="src/pages/Home/img/fashon.png" alt="Fashion" />
            </div>
            <div className="hero-part1">
              <h2 className="edu-nsws">Fashion Frenzy</h2>
              <span>Discover a world of elegance.</span>
            </div>
          </div>
          <div className="swiper pa1 container backswiper">
            <div className="swiper-wrapper data-swiper-autoplay">
              {categories.map((categoriee) => (
                <div className="swiper-slide slides" key={categoriee._id}>
                  <Link to={`/products/?product_id=${categoriee._id}`}>
                    <img src={categoriee.image.secure_url} alt={categoriee.name} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="swiper-pagination d-block rounded-circle"></div>
            <div className="swiper-button-prev swiper-button-lock2 d-block"></div>
            <div className="swiper-button-next d-block"></div>
            <div className="swiper-scrollbar swiper-button-lock2 d-block"></div>
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

export default Home;
