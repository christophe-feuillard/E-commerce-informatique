import React from "react";
import Ptag from "../ptag/Ptag";
import './Cart.css'

const Cart = ({values}) => {

    return (
        <div>
            <article>
            {Object.keys(values).map(function(key, value) {
             return <Ptag data={key} yoyo={values[key]} />
            })}
            </article>
        </div>
    )
}

export default Cart;