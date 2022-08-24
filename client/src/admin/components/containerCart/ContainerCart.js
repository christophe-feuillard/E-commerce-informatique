import {useState,} from 'react'
import './ContainerCart.css'
import Input from '../input/Input'
import Container2 from '../container2/Container2';
import Rowstock from '../rowStock/Rowstock';
import Discount from '../discount/Discount';
import Userform from '../Userform/Userform';
import Usercontainer from '../usercontainer/Usercontainer';
import Banmethode from '../BanMethode/Banmethode';
import { GetGlobalData } from '../../../useContext/AuthProviders';


const ContainerCart = ({ edit, setEdit}) => {
    const {contextUser} = GetGlobalData();
    const [user] = contextUser;
    
    const [elementUpdate, setElementUpdate] = useState({})
    const [created, setCreated] = useState({titre:'', prix:'', description:'', caracteristique:'', photo:'', stock:''})

    console.log(elementUpdate)

    if(user.roles[0] === 'ROLE_ADMIN'){
        if(edit === 'create'){
            return (
            <div className='titlecontainerhome'>
                <Input dataTochange={created} isCreated={true} setEdit={setEdit}/>
            </div>
            
            )
        }

        if(edit === 'update'){
            return (
                <div className='titlecontainerhome'>
                    <Input dataTochange={elementUpdate} isCreated={false} setEdit={setEdit} edit={edit}/>
                </div>
            
            )

        }
        if(edit === 'home'){
            return (
                <div className='titlecontainerhome'>
                    <Container2 setEdit={setEdit} setElementUpdate={setElementUpdate} edit={edit}  />
                </div>
            
            )
        }
        if(edit === 'stock'){
            return (
                <div className='titlecontainerhome'>
                    <Rowstock setEdit={setEdit} setElementUpdate={setElementUpdate}/>
                </div>
                
            )
        }

        if(edit === 'discount'){
            return (
                <div className='titlecontainerhome'>
                    <Discount setEdit={setEdit} elementUpdate={elementUpdate} setElementUpdate={setElementUpdate}/>
                </div>
                
            )
        }

        if(edit === 'users'){
            return (
                <div className='flex overflow-auto'>
                    <Usercontainer setEdit={setEdit} setElementUpdate={setElementUpdate}/>
                    <Banmethode />
                </div>
                
            )
        }

        if(edit === 'userform'){
            return (
                <div className='titlecontainerhome'>
                    <Userform setEdit={setEdit} elementUpdate={elementUpdate}/>
                </div>
                
            )
        }

    }else{
        return <Input dataTochange={elementUpdate} />
    }  
    

}

export default ContainerCart;