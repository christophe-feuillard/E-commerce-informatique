import React, {useEffect,useState}from 'react';
import './ModalSmall.css';

const ModalSmall = ({open,onclose,store,total}) => {

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
            </div>
        </div>
    );
}
export default ModalSmall