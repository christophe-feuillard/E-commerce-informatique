import React, {useEffect, useState} from 'react';
import './ArticlesPopulaires.css';
import {useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import {RiMedalLine} from "react-icons/ri"
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Card = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [perView, setPerView] = useState(2)
  // const [width, setWidth] = useState(window.innerWidth)
  
    let windowWidth = window.innerWidth
  useEffect(() => {

    const callAPI = () => {

      axios.get('http://localhost:8000/api/articles')

        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();

    
  }, []);
  
    if(windowWidth < 900){
      setPerView(1)
    }
  // useEffect(() => {
  //   setWidth(width)
  //   console.log(width)
  
  // }, [width])

  const sorted = data.sort((el1, el2) => el2.visit - el1.visit)

  console.log(JSON.parse(localStorage.getItem("store")))

  return (
  <div className='div_articlepopulaires'>
    <p className='titreArticles'>Nos articles les plus populaires <RiMedalLine/></p>
    <div className='swipe'>
    <Swiper
    modules={[Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={0}
    slidesPerView={perView}
    loop={true}
    // autoplay={{
    //     delay: 5000,
    //     disableOnInteraction: false
    // }}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    >
    {sorted.map((item,key) => ( key < 5 &&
      <SwiperSlide>
        <div onClick={() => navigate("/article_details/"+item.id)} className='cardCarou'>
          {/* <span class="key_articles">{key}</span> */}
        {item.id == localStorage.getItem("store") &&
          <p>Deja dans le panier</p>
        } 
         
      {
        item.discount !== null && 
        <div className='discount'>
             -{item.discount}%
          </div>
      }
          <img src={item.photo} alt="image du produit"/>
          <p className='prixCard'>{item.prix} €</p>
          {
        item.discount !== null && 
        <div className='oldPrice'>
             {item.old_price}
          </div>
      }
          <div>
            <span className="spanCarou">{item.titre}</span>  
          </div>
        </div>
      </SwiperSlide>
    ))}
    </Swiper>
    </div>

  </div>

  )
}
export default Card