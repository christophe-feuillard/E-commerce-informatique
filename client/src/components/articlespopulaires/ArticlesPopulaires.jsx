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

  useEffect(() => {
    const callAPI = () => {
      axios.get('http://127.0.0.1:8000/api/articles')
        .then(res => {
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();

  }, []);

  const sorted = data.map(d => ({id: d.id, titre: d.titre, length: d.lenght ,prix: d.prix, photo: d.photo, description: d.description, visit: d.visit, caracteristique: d.caracteristique})).sort((el1, el2) => el2.visit - el1.visit)
  console.log(data)
  
  return (
  <div className='div_articlepopulaires'>
    <p className='titreArticles'>Nos articles les plus populaires <RiMedalLine/></p>
    <div className='swipe'>
    <Swiper
    modules={[ Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={0}
    slidesPerView={2}
    loop={true}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false
    }}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
    {sorted.map((item,key) => ( key < 5 &&
      <SwiperSlide> 
        <div onClick={() => navigate("/article_details/"+item.id)} className='cardCarou'>
          <img src={item.photo} alt="image du produit"/>
          <p className='prixCard'>{item.prix} €</p>
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