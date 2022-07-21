import React from 'react'
import './stockcontainer.css'
export default function Stockcontainer({data, setEdit, setElementUpdate}) {
  
    return (
        <div className='containerstock'>
            <div className='stockelement'>
                <p>
                  Titre :  {data.titre}
                </p>
            </div>
            
            <div className='stockelement'>
                <img className="imgadmin" src={data.photo} alt="image du produit"/>
            </div>

            <div className='stockelement'>
                <p>
                  Stock : {data.stock} 
                </p>
            </div>

            <div className='stockelement'>
                {/* {data.stock === 0 &&  <p className='redstock'>Rupture de stock</p>} */}
                {data.stock <= 100  && <p className='yellowstock'>stock faible</p>}
                {data.stock >= 100 && <p className='greenstock'>stock suffisant</p>}
            </div>

             <div>
                <p onClick={()=>{setEdit('update'); setElementUpdate(data);}}>modifier le stock</p>
             </div>
        </div>
    )
}
