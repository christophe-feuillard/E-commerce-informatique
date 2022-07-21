import ContainerCart from "../../admin/components/containerCart/ContainerCart";
import { getRole } from "../../admin/requette/requette";
import './account.css';
import {useState, useEffect} from 'react';
import Header from "../../components/header/Header";
import PersonalInfo from "../../admin/components/PersonalInfo/PersonalInfo";

const Account = () =>{
    const info = [{title:"Articles", url:"/api/admin/show"},{title:"Utilisateurs", url:"/api/admin/showW"}];
    const [role, setRole] = useState('')
    const [infoPerso, setInfoPerso] = useState({})
    useEffect(() => {
        getRole(setRole, setInfoPerso);
        
    }, [role]);

    if(role === 'ROLE_USER'){
        return (
            <div>
                <Header />
                <div className="Userhome"><PersonalInfo data={infoPerso}/></div>
            </div>
            
        )
    }

    if(role === 'ROLE_ADMIN'){
        
        return (
        <div className="homecontainer">
            <Header/>
            {/* <NavBAr title={info} setURL={setURL} url={url}/> */}
            <ContainerCart role={role}/>
        </div>
        )
    }
    
    
}

export default Account;
