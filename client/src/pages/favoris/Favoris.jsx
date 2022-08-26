import React from 'react'
import { useEffect, useState } from 'react'
import './favoris.css'
import {BsTrashFill} from "react-icons/bs"
import {useNavigate} from 'react-router-dom';

 const Favoris = () => {
  const navigate = useNavigate();
  const [Favoris, setFavoris] = useState(JSON.parse(localStorage.getItem("favoris")));
  

  const Trash = (id) => {
      console.log("id cible",id)
   
      const filtered = Favoris.filter(item => {
        if (item.id != id) {
          return item.id 
        }
      });
      localStorage.setItem('favoris', JSON.stringify(filtered));
      setFavoris(filtered)
      
      console.log(filtered)
  }
  

// useEffect(() => {
//   console.log(Favoris.length)
// }
//   ,[]);

if (Favoris.length == 0) {
  return(
    <div>
         <p className='TextFavoris'>Mes articles favoris</p>
         <div className='containerNoArticle'>
      <p className='NoArticle'>Vous avez 0 article en favoris</p>
      <div className='ShowArticleHome' onClick={()=> navigate("/home")}>
        <p className='ArticleShow'>Voire les articles</p>
      </div>
      </div>
    </div>
  )
} else {

  return (
    <div>
      <p className='TextFavoris' >Mes articles favoris</p>
         {Favoris.map((item, key) => (
          <div key={key} className='margin'>
            <div className='GrdContainerFav'>
            <div className='containerFav'>
            <p>{item.id}</p>        
   <p>{item.titre}</p>
   <img className='imgFavoris' src={item.photo} alt="" />
   <p>{item.description}</p>
   <p>{item.caracteristique}</p>
    </div>

    <div> 
          <BsTrashFill onClick={() => Trash(item.id)} className='logoTrash'/>
          
    </div>
    </div>
   </div>  
                        ))}
    </div>
  )
}
}

export default Favoris