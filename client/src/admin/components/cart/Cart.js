import React from "react";
import Ptag from "../ptag/Ptag";
import './Cart.css'
import { APIdelete } from "../../requette/requette";

const Cart = ({values}) => {
console.log(values.id)
    return (
        <div>
            <article>
                {Object.keys(values).map(function(key, value) {
                return <Ptag data={key} yoyo={values[key]} />
                })}
                <div className="containerbutton">
                    <div onClick={APIdelete(values.id)}>
                        <h3>supprimer</h3>
                    </div>

                    <div>
                        <h3>modifier</h3>
                    </div>
                </div>
            
            </article>
        </div>
    )
}

export default Cart;