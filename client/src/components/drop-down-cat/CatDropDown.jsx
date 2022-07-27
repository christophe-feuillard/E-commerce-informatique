import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CatDropDown.css'

export default function CatDropDown() {

    const [catData, setCatData] = useState([])
    const navigate = useNavigate()

    //console.log(catData, 'Les cats');

    useEffect(() => {
        const callAPI = () => {
          axios.get('/api/categories')
          .then(res => {
    
              setCatData(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
        callAPI();
    
    }, []);

    const changePage = (e) => {
        const id = e.target.value // recuperer l'id de la cat
       navigate('/categories/' + id)
    }

    return (
    <div className="select_container">
        <select onChange={changePage} className="select_content">
            {catData.map((op,i)=>(     
               <CatOption key={i} data={op}/>
            ))}
        </select>
    </div>
  )
}

function CatOption({data}) {
    return (
        <>
            <option value="">--Sélectionnez une catégorie--</option>
            <option key={data.id} value={data.id}>{data.titre}</option>
        </>
    )  
}
    