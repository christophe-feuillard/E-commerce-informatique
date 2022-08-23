import React from 'react'
import Header from '../header/Header'
import { GetGlobalData } from '../../useContext/AuthProviders';
import { useNavigate } from 'react-router-dom';
import {BsTrashFill} from "react-icons/bs"
import { Trash } from './trash';
import './Panier.css'

 const Panier = () => {
  const {contextStore, contextTotal, contextUser} = GetGlobalData();
  const [store, setStore] = contextStore;
  const [total] = contextTotal;
  const [user] = contextUser;
  
    
    const navigate = useNavigate();

    const PriceTotale =(props)=>{
        console.log(total)
        navigate('/commande',{totale : 'total'});
    }

    if (total == 0) {
      return(
        <div>
            <Header />
        <div className='grandContainer'>
            <div className='modelContainerSmallArticle'>
               <p className='PasArticle'>Vous n'avez aucun article dans votre panier</p>
                <div className='voirArticles'>
                    <p  onClick={()=>navigate("/home")} >
                    Voire les articles
                    </p>
                </div>
            </div>
        </div>
        </div>
    
        )
    }else { 
        return (
            // {store.map((item, key) => (
            //     <div key={key} className='flexItem'>
            //       <div className='DivItemProduit'>
            //        <img className='imgWidth' src={item.photo} alt="" />
            //       <p className='textUppercase'>{item.titre}</p>
            //       </div>
            //       {/* <div className='displayFlex'> */}

            //       <div className='DivItemQuantité'>
            //         {item.quantity}
            //       </div>
            //       <div className='DivItemTotal'>
            //         {item.prix * item.quantity + '€'}
            //       </div>
            //       <div className='trash'>
            //       <BsTrashFill onClick={()=>Trash(item.id,setStore, store)} /> 
            //       </div>
            //       {/* </div> */}
            //     </div>
            // ))}
            <div>
              {/* <Header /> */}
        <div class="w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
            <div class="w-full z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                <div class="flex  lg:flex-row flex-col " id="cart">
                    <div class="w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-x-hidden lg:h-screen h-auto" id="scroll">
                        <div class="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer">
                            <p onClick={()=> navigate("/home")} class="text-sm pl-2 leading-none dark:hover:text-gray-200">Retourner sur la page d'accueil</p>
                        </div>
                        <p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">Panier</p>
                        {store.map((item, key) => (
                            <div class="md:flex justify-center items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50 ">

                            <div>
                                <img src={item.photo} alt="Black Leather Bag" class="w-64 object-center object-cover"/>
                            </div>
 
                            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                            {
        item.discount !== null && 
        <div className='discount'>
          RÉDUCTION DE 
             -{item.discount}%
          </div>
      }
                                <p class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
                                <div class="flex items-center justify-between w-full pt-1">
                                    <p class="text-base font-black leading-none text-gray-800 dark:text-white">{item.titre}</p>
                                    <div className="text-base font-black leading-none text-gray-800 dark:text-white" >
                      {item.quantity}
                    </div>
                                </div>
                                <p class="text-xs leading-3 text-gray-600 dark:text-white pt-2">Longueur: {item.height + ' cm'}</p>
                                <p class="text-xs leading-3 text-gray-600 dark:text-white py-4">Couleur: Gris</p>
                                <div class="flex items-center justify-between pt-5">
                                    <div class="flex itemms-center">
                                        <p class="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Ajouter au favoris</p>
                                        <p  onClick={()=>Trash(item.id,setStore, store)} class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Supprimer</p>
                                    </div>
                                    {/* {item.old_price !== null &&
                     <p className='text-red-800'>{item.old_price + "€"}</p>
            } */}
                    <div className="text-base text-1xl font-black leading-none text-gray-800 dark:text-white">
                      {item.prix * item.quantity + '€'}
                    </div>
                                </div>
                            </div>
                        </div>
                            ))}
                    
                        </div>
                    <div class="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full">
                        <div class="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                            <div>
                                <p class="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
                                <div class="flex items-center justify-between pt-16">
                                    <p class="text-base leading-none text-gray-800 dark:text-white">Sous-Total</p>
                                    <p class="text-base leading-none text-gray-800 dark:text-white">{total} €</p>
                                </div>
                                <div class="flex items-center justify-between pt-5">
                                    <p class="text-base leading-none text-gray-800 dark:text-white">Frais de port</p>
                                    <p class="text-base leading-none text-gray-800 dark:text-white">$30</p>
                                </div>
                                <div class="flex items-center justify-between pt-5">
                                    <p class="text-base leading-none text-gray-800 dark:text-white">Tax</p>
                                    <p class="text-base leading-none text-gray-800 dark:text-white">$35</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                    <p class="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
                                    <p class="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">{total} €</p>
                                </div>
                              
<button class="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700" onClick={()=>navigate("/example", {total})}>Passez au paiement</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        
        
    
        </div>
    
                 )} }
export default Panier