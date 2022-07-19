import {useState, useEffect} from "react";
import NavBAr from "../../admin/components/Navbar/NavBar";
import ContainerCart from "../../admin/components/containerCart/ContainerCart";
import axios from "axios";

const Account = () =>{
    const [url, setURL] = useState('/api/admin/show');
    const [data, setData] = useState([])
    const info = [{title:"Articles", url:"/api/admin/show"},{title:"Utilisateurs", url:"/api/admin/showW"}];
    const Token = localStorage.getItem("token");
    
    useEffect(() => {
        MakeRequest();
    },[url]);

    const MakeRequest = () => {

        var config = {
            method: 'post',
            url: url,
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            }
          };
          
          axios(config)
          .then(response => {
          setData(response.data);
          })
          .catch(error => {
          console.log(error);
          });
        }
    return (
        <div>
            <NavBAr title={info} setURL={setURL} url={url}/>
            <ContainerCart data={data} />
        </div>
    )
}

export default Account;
