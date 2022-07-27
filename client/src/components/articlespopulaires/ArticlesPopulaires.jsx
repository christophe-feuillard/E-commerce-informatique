import React, {useEffect, useState} from 'react';
import './ArticlesPopulaires.css';
import {useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Card = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const callAPI = () => {
      axios.get('https://127.0.0.1:8000/api/articles')
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
    <h2 className='titreArticles'>Articles les plus populaires</h2>
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={20}
    slidesPerView={3}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
    >
    {sorted.map((item,key) => ( key < 5 &&
      <SwiperSlide> 
        <div onClick={() => navigate("/article_details/"+item.id)} className='cardCarou'>
          <img src={item.photo} alt="image du produit"/>
          <div>
            <span className="spanCarou">{item.titre}</span>  
          </div>
        </div>
      </SwiperSlide>
    ))}
    </Swiper>
  </div>

  )
}

export default Card