import React from 'react'
import './dropdown.css'

import { useNavigate } from 'react-router-dom';
const Dropdown = ({item}) => {
    const navigate = useNavigate();
  return (
    <div >
            <p onClick={()=> navigate(`/article_details/${item.id}`)} class="dropstyle">{item.titre}</p>
    </div>
  )
}

export default Dropdown