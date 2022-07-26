import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalSmall.css';

const ModalSmall = ({open,onclose,store,total,log}) => {
    const navigate = useNavigate();

    if(!open) return null;
    else return (
        <div className="overlaySmall" onClick={onclose}>
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
                        <p className='total'>Total {total}€</p>
                    </tbody>
                </table>
                    {log ? 
                        <div className='buttonModalSmall'>
                            <button className='buttonBuy' onClick={()=>navigate("/frais")} >Achater</button>
                        </div>
                        :
                        <div className='buttonModalSmall'>
                            <button className='buttonBuy'  onClick={()=>navigate("/frais")}>Continuez pour l'achat</button>
                            <button className='buttonBuy' onClick={()=>navigate("/login")}>se connecter pour l'achat</button>
                        </div>
                    }
            </div>
        </div>
    );
}
export default ModalSmall