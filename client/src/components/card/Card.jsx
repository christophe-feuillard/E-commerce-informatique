import React, {useEffect, useState} from 'react';
import './Card.css';
import {MdOutlineFavorite} from "react-icons/md";


const Card = ({imgSrc,title,characteristic,price,stock,size,handleckick,colorFavoris,clickStore,clickFavoris, textStore}) => {
  const [color,setColor] = useState("black");
  const [text,setText] = useState("Ajouter dans le panier");

  useEffect(() => {
    if(colorFavoris) setColor("#eb4f29");
    else setColor('black');

  }, [colorFavoris]);

  useEffect(() => {
    if(textStore) setText("Retirer du panier");
    else setText('Ajouter dans le panier');

  },[textStore]);
  // console.log(colorStore)
  


  return (
    
    <div id="voirArticles" className='main'>
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
                {/* <MdOutlineLocalGroceryStore className='iconCard' color={color} onClick={clickStore}/> */}
                
                  {stock > 0 && 
                    <p className='addPanier' onClick={clickStore}>{text}</p>
                  }
                {stock <= 0 && 
                <p className='addPanierDisabled'>Indisponible</p>
                } 
                <div onClick={clickFavoris} className='fav'>
                <MdOutlineFavorite color={color} className='iconCard'/>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Card