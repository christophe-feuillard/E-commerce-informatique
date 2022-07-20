import React from "react";
import './ptag.css'

const Ptag = ({data, yoyo}) =>{

    if(data === 'photo'){
        return <div><img src={yoyo} alt="image du produit"/></div>
    }
    else{
        return <div><p>{data} : {yoyo}</p></div>
    }
}

export default Ptag;

