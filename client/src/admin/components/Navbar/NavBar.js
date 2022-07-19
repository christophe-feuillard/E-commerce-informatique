import {useState, useEffect} from "react";
import Link from '../link/Link'

const NavBAr = ({title,url, setURL}) =>{
    

    

  return (
    <div className="containernavbar">
        {title.map(v =>{
            return <Link title={v} setURL={setURL}  />
        })}
    </div>
  );
}

export default NavBAr;