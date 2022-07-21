import {useState, useEffect} from "react";
import Link from '../link/Link'
import { useNavigate } from "react-router-dom";

const NavBAr = ({title, setEdit}) =>{
    const navigate = useNavigate()

    return (
    <div className="containernavbar">
        <div className="containerLinkNav">
            {title.map(v =>{
            return <Link title={v} setEdit={setEdit}  />
             })}
        </div>
        
        <div>
            <p className="titleNavbar" onClick={()=> navigate('/home')}>Retour à l'accueil</p>
        </div>
     </div>
  );
}

export default NavBAr;