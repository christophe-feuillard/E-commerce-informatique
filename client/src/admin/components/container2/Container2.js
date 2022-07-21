import {useState, useEffect} from 'react'
import Cart from '../cart/Cart'
import '../containerCart/ContainerCart.css'
import Input from '../input/Input'
import { getItem } from "../../requette/requette";
import { useNavigate } from 'react-router-dom';

const Container2 = ({setEdit, setElementUpdate, edit}) => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    useEffect(() => {
     getItem(setData);
        
     },[]);

     console.log(data)
     
    return (
        <div className='Container'>
            <h2 onClick={() => setEdit('create')}>Créer un article</h2>
            <h2 onClick={() => navigate('/home')}>Retour a l'accueil</h2>
            <div className='Containercart'>
                {data.map(v =>{ return <Cart values={v} setEdit={setEdit} setElementUpdate={setElementUpdate} edit={edit} />})}
            </div>
            
        </div>
      );
}

export default Container2;