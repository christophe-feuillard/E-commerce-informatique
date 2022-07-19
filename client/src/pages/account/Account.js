import {useState, useEffect} from "react";
import NavBAr from "../../admin/components/Navbar/NavBar";
import ContainerCart from "../../admin/components/containerCart/ContainerCart";
import { getItem } from "../../admin/requette/requette";
import './account.css'

const Account = () =>{
    const [url, setURL] = useState('/api/admin/show');
    const [data, setData] = useState([])
    const info = [{title:"Articles", url:"/api/admin/show"},{title:"Utilisateurs", url:"/api/admin/showW"}];
    const Token = localStorage.getItem("token");

    useEffect(() => {
       getItem(url, setData);

    },[url]);
    
    return (
        <div className="homecontainer">
            <NavBAr title={info} setURL={setURL} url={url}/>
            <ContainerCart data={data} />
        </div>
    )
}

export default Account;
