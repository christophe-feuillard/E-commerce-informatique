import ContainerCart from "../../admin/components/containerCart/ContainerCart";
import './account.css';
import {useState} from 'react';
import PersonalInfo from "../../admin/components/PersonalInfo/PersonalInfo";
import NavBAr from "../../admin/components/Navbar/NavBar";
import { GetGlobalData } from '../../useContext/AuthProviders';

const Account = () =>{

  const {contextUser} = GetGlobalData();
  const [user] = contextUser;


  const info = [{title:"Articles", url:"home"},{title:"Stock", url:"stock"}, {title:"Créer un article", url:"create"}, {title:"Utlisateurs", url:"users"}];
    const [edit, setEdit] = useState('home')

    if(user?.roles[0] === 'ROLE_USER'){

        return (
            <div>
    
                <div className="Userhome"><PersonalInfo/></div>
            </div>
            
        )
    }

    if(user?.roles[0] === 'ROLE_ADMIN'){
        
        return (

            <div className='flex min-h-screen bg-gray-50 rounded dark:bg-gray-800'>
                <div className="w-64 min-h-screen w-2/12" aria-label="Sidebar">
                    <NavBAr title={info} setEdit={setEdit}/> 
                </div>
                <div className="bg-gray-900 w-full" >
                    <ContainerCart edit={edit} setEdit={setEdit}/>
                </div>
                
            </div>
            

        )
    }
    
    
}

export default Account;
