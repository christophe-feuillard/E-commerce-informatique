import {useState, useEffect} from 'react'
import Cart from '../cart/Cart'
import './ContainerCart.css'
import Input from '../input/Input'
import { getItem } from "../../requette/requette";
import Container2 from '../container2/Container2';
import Rowstock from '../rowStock/Rowstock';

const ContainerCart = ({role, edit, setEdit}) => {

    const [elementUpdate, setElementUpdate] = useState({})
    const [created, setCreated] = useState({titre:'', prix:'', description:'', caracteristique:'', photo:'', stock:''})


    if(role === 'ROLE_ADMIN'){
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
    }else{
        return <Input dataTochange={elementUpdate} />
    }  
    

}

export default ContainerCart;