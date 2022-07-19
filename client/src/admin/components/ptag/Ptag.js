import React from "react";
import './ptag.css'

const Ptag = ({data, yoyo}) =>{
console.log(data)
    return <div><p>{data} : {yoyo}</p></div>
}

export default Ptag;