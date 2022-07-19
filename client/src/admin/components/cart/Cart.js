import React from "react";
import Ptag from "../ptag/Ptag";
import './Cart.css'
import { APIdelete } from "../../requette/requette";

const Cart = ({values, setEdit, setElementUpdate}) => {

   
    return (
        <div>
            <article>
                {Object.keys(values).map(function(key, value) {
                return <Ptag data={key} yoyo={values[key]} />
                })}
                <div className="containerbutton">
                    <div>
                        <h3 onClick={()=>APIdelete(values.id)}>supprimer</h3>
                    </div>

                    <div 
                    onClick={() => {
                        setEdit('update') 
                        setElementUpdate(values)}}
                    >
                        <h3>modifier</h3>
                    </div>
                </div>
            
            </article>
        </div>
    )
}

export default Cart;