import ContainerCart from "../../admin/components/containerCart/ContainerCart";
import { getRole } from "../../admin/requette/requette";
import './account.css';
import {useState, useEffect} from 'react';
import Header from "../../components/header/Header";
import PersonalInfo from "../../admin/components/PersonalInfo/PersonalInfo";
import NavBAr from "../../admin/components/Navbar/NavBar";

const Account = () =>{
    const info = [{title:"Articles", url:"home"},{title:"Stock", url:"stock"}, {title:"Créer un article", url:"create"}];
    const [role, setRole] = useState('')
    const [infoPerso, setInfoPerso] = useState({})
    const [edit, setEdit] = useState('home')

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
            <div className="accountcontainer">
                <NavBAr title={info} setEdit={setEdit}/> 
                <ContainerCart role={role} edit={edit} setEdit={setEdit}/>
            </div>
            
        </div>
        )
    }
    
    
}

export default Account;
