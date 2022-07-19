import {useState, useEffect} from 'react'
import Cart from '../cart/Cart'
import './ContainerCart.css'
import '../../../components/modal/Modal.css'
import Input from '../input/Input'

const ContainerCart = ({data}) => {

    const [edit, setEdit] = useState('home')
    const [elementUpdate, setElementUpdate] = useState({})
    const [created, setCreated] = useState({titre:'titre', prix:'prix', description:'description', caracteristique:'caracteristique', photo:'photo', stock:'stock'})

    if(edit === 'update'){
        return  <Input dataTochange={elementUpdate}/>

    }
    if(edit === 'home'){
        return (
        <div className='Container'>
            <h2 onClick={event => setEdit('create')}>Créer un article</h2>
            <div className='Containercart'>
                {data.map(v =>{ return <Cart values={v} setEdit={setEdit} setElementUpdate={setElementUpdate}/>})}
            </div>
            
        </div>
      );
    }
    console.logt(edit)
    if(edit === 'create'){
        <Input dataTochange={created}/>
    }
    

}

export default ContainerCart;