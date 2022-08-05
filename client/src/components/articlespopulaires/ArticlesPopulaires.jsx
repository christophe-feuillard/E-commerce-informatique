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


const Card = ({store}) => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

  const sorted = data.map(d => ({id: d.id, titre: d.titre, length: d.lenght ,prix: d.prix, photo: d.photo, description: d.description, visit: d.visit, caracteristique: d.caracteristique})).sort((el1, el2) => el2.visit - el1.visit)

  // console.log(store)
  console.log(JSON.parse(localStorage.getItem("store")))

  return (
  <div className='div_articlepopulaires'>
    <p className='titreArticles'>Nos articles les plus populaires <RiMedalLine/></p>
    <div className='swipe'>
    <Swiper
    modules={[ Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={0}
    slidesPerView={2}
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
          <span class="key_articles">{key}</span>
        {item.id == localStorage.getItem("store") &&
          <p>Deja dans le panier</p>
        } 
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