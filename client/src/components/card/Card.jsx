import React, {useEffect, useState} from 'react';
import './Card.css';
import {AiOutlineHeart} from "react-icons/ai";

const Card = ({imgSrc,title,characteristic,price,stock,size,handleckick,colorStore,clickStore,clickFavoris}) => {
  const [color,setColor] = useState("white");
  useEffect(() => {
    if(colorStore) setColor("#eb4f29");
    else setColor('white');
  }, [colorStore]);
  


  return (
    
    <div className='main'>
      
        <div className="picture" onClick={handleckick}>
            <img className='imgCard' src={imgSrc} alt="image du produit"/>
        </div>
        <div className="contentCard">
            <p className='titleCard' onClick={handleckick}>{title}</p>
            <div className='divCharacteristic'>
              <p className='characteristic'>{characteristic}</p>
              <p className='size'>{size}</p>
            </div>
            <p className='price'>{price}</p>
            <div className='divIconsCard'>
                {stock > 0 && 
                <p className='addPanier' onClick={clickStore}>Ajouter au panier</p>
                }
                {stock <= 0 && 
                <p className='addPanierDisabled'>Indisponible</p>
                }
                <div onClick={clickFavoris} className='fav'>
                <AiOutlineHeart className='iconCard'/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Card