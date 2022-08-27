import React, {useEffect, useState} from 'react';
import './Card.css';
import {MdOutlineFavorite} from "react-icons/md";
import { GetGlobalData } from '../../useContext/AuthProviders';

const Card = ({articles,handleckick,colorFavoris,clickFavoris, textStore}) => {
  const {contextStore} = GetGlobalData();
  const [store, setStore] = contextStore;
  const [color,setColor] = useState("black");
  const [text,setText] = useState("Ajouter dans le panier");

  useEffect(() => {
    if(colorFavoris) setColor("#eb4f29");
    else setColor('black');

  }, [colorFavoris]);

  const handleStore = () => {
console.log(articles)
   const foundArticleInLocalStorage = store.find(element => element.id === articles.id);
   if (foundArticleInLocalStorage ) {
  
    setStore(
      store.map((item, key) => item.id == articles.id ? {...articles, quantity:foundArticleInLocalStorage.quantity + 1}: item)
     )
   } else {
    setStore([...store, {...articles, quantity: 1}])
   }

  }

  return (
    
    <div className='antialiased  text-gray-900 font-sans p-6'>
  <div class="container mx-auto">
    <div class="flex flex-wrap w-full ">
      <div class="w-96">
        <div class="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      {
        articles.discount !== null && 
        <div className='discount'>
          RÉDUCTION DE 
             -{articles.discount}%
          </div>
      }
        <div onClick={handleckick} class="relative pb-80  overflow-hidden">
          <img class="absolute inset-0 h-full w-full object-cover" src={articles.photo} alt=""/>
        </div>
        <div class="p-4">
          {articles.visit >= 70 &&
          
          <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">Populaire</span>
          }
          <h2 onClick={handleckick} class="mt-2 mb-2  font-bold">{articles.titre}</h2>
          <p class="text-sm">{articles.caracteristique}</p>
          <div class="mt-3 flex items-center centerPrice">
          {articles.old_price !== null &&
            <p className='oldPricee'>Ancien prix : {articles.old_price + "€"} </p>
            }
          <span class="font-bold text-xl">{articles.prix + '€'}</span>
          </div>
        </div>
          <div onClick={handleckick} class="p-4 border-t flex items-center text-sm text-gray-600"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-yellow-500"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-400"><path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path></svg><span class="ml-2">Avis</span></div>
        <div class="p-4 border-t border-b text-xs text-gray-700 flex justify-around">
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
        
    </div>
  </div>

      {/* {
        articles.discount !== null && 
        <div className='discount'>
          RÉDUCTION DE 
             -{articles.discount}%
          </div>
      }
        <div className="picture" onClick={handleckick}>
            <img className='imgCard' src={articles.photo} alt="produit"/>
        </div>
        <div className="contentCard">
            <p className='titleCard' onClick={handleckick}>{articles.titre}</p>
            <div className='divCharacteristic'>
              <p className='characteristic'>{articles.caracteristique}</p>
            </div>
            {articles.old_price !== null &&
            <p className='oldPrice'>{articles.old_price + "€"}</p>
            }
            <p className='price'>{articles.prix + "€"}</p>
            <div className='divIconsCard'>                
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

        </div> */}
    </div>
  )
}

export default Card