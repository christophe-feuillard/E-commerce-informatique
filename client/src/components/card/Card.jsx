import './Card.css';
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import {AiOutlineHeart} from "react-icons/ai";
import Button from '../button/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({imgSrc,title,characteristic,price,handleckick}) => {

  const [stock, setStock] = useState([]);

  useEffect(() => {
    
    const callAPI = () => {
      axios.get('/api/articles')
      .then(res => {
        setStock(res.data.stock);
      })
      .catch(err => {
        console.log(err);
      });
    }
    callAPI();
    console.log(stock, 'stockstock');

  }, []);
  return (
    <div className='main'>
        <div className="picture" onClick={handleckick}>
            <img src={imgSrc} alt="image du produit"/>
        </div>
        <div className="contentCard">
            <h3 onClick={handleckick}>{title}</h3>
            <p className='characteristic'>{characteristic}</p>
            <p className='price'>{price}</p>
            <div className='divIconsCard'>
                <MdOutlineLocalGroceryStore className='iconCard'/>
                <AiOutlineHeart className='iconCard'/>
                <Button value={"Ajouter au panier"}/>
            </div>
        </div>
    </div>
  )
}

export default Card