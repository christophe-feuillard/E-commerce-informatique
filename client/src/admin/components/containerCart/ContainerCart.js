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
            return <Input dataTochange={created} isCreated={true} setEdit={setEdit}/>
        }

        if(edit === 'update'){
            return <Input dataTochange={elementUpdate} isCreated={false} setEdit={setEdit} edit={edit}/>

        }
        if(edit === 'home'){
            return <Container2 setEdit={setEdit} setElementUpdate={setElementUpdate}  />
        }
        if(edit === 'stock'){
            return <Rowstock setEdit={setEdit} setElementUpdate={setElementUpdate}/>
        }
    }else{
        return <Input dataTochange={elementUpdate} />
    }  
    

}

export default ContainerCart;