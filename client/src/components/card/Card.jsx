import React, {useEffect, useState} from 'react';
import './Card.css';
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import {AiOutlineHeart} from "react-icons/ai";

const Card = ({imgSrc,title,characteristic,price,size,handleckick,colorStore,clickStore}) => {
  const [color,setColor] = useState("white");

  useEffect(() => {
    if(colorStore) setColor("#eb4f29");
    else setColor('white');
  }, [colorStore]);
  
  return (
    <div className='main'>
     
        <div className="picture" onClick={handleckick}>
            <img src={imgSrc} alt="image du produit"/>
        </div>
        <div className="contentCard">
            <h3 onClick={handleckick}>{title}</h3>
            <div className='divCharacteristic'>
              <p className='characteristic'>{characteristic}</p>
              <p className='size'>{size}</p>
            </div>
            <p className='price'>{price}</p>
            <div className='divIconsCard'>
                {/* <MdOutlineLocalGroceryStore className='iconCard' color={color} onClick={clickStore}/> */}
                <p className='addPanier' onClick={clickStore} >Ajouter au panier</p>
                <div className='fav'>
                <AiOutlineHeart className='iconCard'/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Card