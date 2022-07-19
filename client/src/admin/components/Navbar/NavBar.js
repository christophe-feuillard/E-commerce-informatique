import {useState, useEffect} from "react";
import Link from '../link/Link'

const NavBAr = ({title,url, setURL}) =>{
    

    

  return (
    <div>
        {title.map(v =>{
            return <Link title={v} setURL={setURL}  />
        })}
        <h2>Count: {url}</h2>
    </div>
  );
}

export default NavBAr;