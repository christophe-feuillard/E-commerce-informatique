import React from 'react'
import Header from '../header/Header'
import { GetGlobalData } from '../../useContext/AuthProviders';
import { useNavigate } from 'react-router-dom';
import {BsTrashFill} from "react-icons/bs"
import { Trash } from './trash';
import './Panier.css'

 const Panier = () => {
  const {contextStore, contextTotal, contextLog} = GetGlobalData();
  const [store, setStore] = contextStore;
  const [total] = contextTotal;
  const [login] = contextLog;
    


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
            <div>
              <Header />
            <div className='grandContainer' >
            <div className="modelContainerSmall">
              <p className='panier'>Mon Panier</p>
              <div className='itemHead'>
                <div className='itemProduit'>Produits</div>
                <div className='itemQuantité'>Quantité</div>
                <div className='itemTotal'>Sous-Total</div>
              </div>

              <div className='divArticles'>
              <div className='mapProduit'>
              {store.map((item, key) => (
                  <div key={key} className='flexItem'>
                    <div className='DivItemProduit'>
                     <img className='imgWidth' src={item.photo} alt="" />
                    <p className='textUppercase'>{item.titre}</p>
                    </div>
                    {/* <div className='displayFlex'> */}

                    <div className='DivItemQuantité'>
                      {item.quantity}
                    </div>
                    <div className='DivItemTotal'>
                      {item.prix * item.quantity + '€'}
                    </div>
                    <div className='trash'>
                    <BsTrashFill onClick={()=>Trash(item.id,setStore, store)} /> 
                    </div>
                    {/* </div> */}
                  </div>
              ))}
              </div>
              </div>
                        <p className='total'>Cela vous fera un total de {total}€</p>
                    {login ? 
                        <div className='buttonModalSmall'>
                            <button className='buttonBuy' onClick={()=>navigate("/commande", {total})}>Acheter</button>
                        </div>
                        :
                        <div className='buttonModalSmall'>
                            <button className='buttonBuy'  onClick={()=>{PriceTotale(total)}}>Continuez pour l'achat</button>
                            <button className='buttonBuy' onClick={()=>navigate("/login")}>Se connecter pour l'achat</button>
                        </div>
                    }
            </div>
                    </div>
        </div>
    
                 )} }
export default Panier