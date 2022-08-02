import React, {useEffect, useState} from 'react';
import './Card.css';
import {MdOutlineFavorite} from "react-icons/md";
import { GetGlobalData } from '../../useContext/AuthProviders';



const Card = ({articles,handleckick,colorFavoris,clickFavoris, textStore, size}) => {
  const {contextStore} = GetGlobalData();
  const [store, setStore] = contextStore;
  // console.log(store, 'storee')
  const [color,setColor] = useState("black");
  const [text,setText] = useState("Ajouter dans le panier");

  useEffect(() => {
    if(colorFavoris) setColor("#eb4f29");
    else setColor('black');

  }, [colorFavoris]);

  // useEffect(() => {
  //   if(textStore) setText("Retirer du panier");
  //   else setText('Ajouter dans le panier');

  // },[textStore]);



  const handleStore = () => {

   const foundArticleInLocalStorage = store.find(element => element.id == articles.id);
   if (foundArticleInLocalStorage ) {
  
    setStore(
      store.map((item) => item.id == articles.id ? {...articles, quantity:foundArticleInLocalStorage.quantity + 1}: item)
     )
   } else {
    setStore([...store, {...articles, quantity: 1}])
   }

 console.log(store)

// console.log();


  }
  
  


  return (
    
    <div id="voirArticles" className='main'>
        <div className="picture" onClick={handleckick}>
            <img className='imgCard' src={articles.photo} alt="image du produit"/>
        </div>
        <div className="contentCard">
            <p className='titleCard' onClick={handleckick}>{articles.titre}</p>
            <div className='divCharacteristic'>
              <p className='characteristic'>{articles.caracteristique}</p>
              <p className='size'>{size}</p>
            </div>
            <p className='price'>{articles.prix + "€"}</p>
            <div className='divIconsCard'>
                {/* <MdOutlineLocalGroceryStore className='iconCard' color={color} onClick={clickStore}/> */}
                
                  {articles.stock > 0 && 
                    <p className='addPanier' onClick={handleStore}>{text}</p>
                  }
                {articles.stock <= 0 && 
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