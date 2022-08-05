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

    console.log(infoPerso)

    if(role === 'ROLE_USER'){
        return (
            <div>
                {/* <Header /> */}
                <div className="Userhome"><PersonalInfo data={infoPerso}/></div>
            </div>
            
        )
    }

    if(role === 'ROLE_ADMIN'){
        
        return (

            <div className='flex min-h-screen bg-gray-50 rounded dark:bg-gray-800'>
                <div className="w-64 min-h-screen w-2/12" aria-label="Sidebar">
                    <NavBAr title={info} setEdit={setEdit}/> 
                </div>
                <div className="bg-gray-900 w-full" >
                    <ContainerCart role={role} edit={edit} setEdit={setEdit}/>
                </div>
                
            </div>
            

        )
    }
    
    
}

export default Account;
