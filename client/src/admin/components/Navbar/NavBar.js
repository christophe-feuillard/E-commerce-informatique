import {useState, useEffect} from "react";
import Link from '../link/Link'
import { useNavigate } from "react-router-dom";

const NavBAr = ({title, setEdit}) =>{
    const navigate = useNavigate

    return (
    <div className="containernavbar">
        {title.map(v =>{
            return <Link title={v} setEdit={setEdit}  />
        })}
        <div>
            <h2 onClick={()=> navigate('/home')}>Retour à l'accueil</h2>
        </div>
    </div>
  );
}

export default NavBAr;