import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CatDropDown.css'

export default function CatDropDown() {

    const [catData, setCatData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const callAPI = () => {
          axios.get('http://127.0.0.1:8000/api/categories')
          .then(res => {
    
              setCatData(res.data);
              console.log(res.data)
            })
            .catch(err => {
              console.log(err);
            });
        }
        callAPI();
    
    }, []);

    const changePage = (e) => {
        const id = e.target.value
       navigate('/categories/' + id)
    }

    return (
    <div className="select_container">
        <select onChange={changePage} className="select_content outline-none text-slate-900 bg-transparent uppercase font-bold text-sm p-4 mr-4">
        <option defaultValue >Séléctionner une catégorie</option>
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
           
            <option key={data.id} value={data.id}>{data.name}</option>
        </>
    )  
}
    