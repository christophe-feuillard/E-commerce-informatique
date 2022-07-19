import React from 'react'
import Cart from '../cart/Cart'
import './ContainerCart.css'

const ContainerCart = ({data}) => {
console.log(data)
    return (
        <div className='Container'>
            {data.map(v =>{ return <Cart values={v}  />})}
        </div>
      );
    

}

export default ContainerCart;