import {useState, useEffect} from 'react'
import Cart from '../cart/Cart'
import '../containerCart/ContainerCart.css'
import { getItem } from "../../requette/requette";


const Container2 = ({setEdit, setElementUpdate, edit}) => {
    const [data, setData] = useState([])

    useEffect(() => {
     getItem(setData);
        
     },[edit]);

     console.log(data)
     
    return (
        <div className='Container'>
            <div className='flex flex-wrap justify-center '>
                {data.map(v =>{ return <Cart values={v} setEdit={setEdit} setElementUpdate={setElementUpdate} edit={edit} />})}
            </div>
        </div>
      );
}

export default Container2;