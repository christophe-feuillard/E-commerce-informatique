import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalSmall.css';

const ModalSmall = ({open,onclose,store,total,log}) => {
    const navigate = useNavigate();



    const PriceTotale =(props)=>{
        console.log(total)
        navigate('/commande',{totale : 'total'});
          }

    if(!open) return null;
    else 
    if (total == 0) {
        return(
            <div className="overlaySmall" onClick={onclose}>
        <div className='grandContainer'>
            <div className='modelContainerSmallArticle'>
               <p className='PasArticle'>Vous n'avez aucun article dans votre panier</p>
                <div className='voirArticles'>
                    <a className='LinkVoirArticles' href="#voirArticles">
                    Voire les articles
                    </a>
                </div>
            </div>
        </div>
        </div>
    
        )
    }else {
        
        return (
            <div className="overlaySmall" onClick={onclose}>
            <div className='grandContainer' >
            <div className="modelContainerSmall">
                <table>
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Prix</th>
                        </tr>
                        {store.map((item,index) => (
                            <tr key={index}>
                               <td className='tdImage'><img src={item.photo} alt="image de l'article"/></td>
                                <td>{item.titre}</td>
                                <td>{item.prix} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                        <p className='total'>Cela vous fera un total de {total}€</p>
                    {log ? 
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
    );
}
}
export default ModalSmall