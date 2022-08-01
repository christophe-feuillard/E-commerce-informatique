import React from "react";
import Ptag from "../ptag/Ptag";
import './Cart.css'
import { APIdelete } from "../../requette/requette";

const Cart = ({values, setEdit, setElementUpdate, edit}) => {

   
    return (
        <div>
            <article class="mx-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="##">
                   <img class="rounded-t-lg" src={values.photo} alt=""/>
                 </a>

                 <div class="p-5">
                    <a href="##">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{values.titre}</h5>
                    </a>
                    
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Prix : {values.prix} euros</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">stock : {values.stock} unités</p>
                    {values.discount !== null && <p class="mb-3 font-normal text-gray-700 dark:text-red-400">soldé a hauteur de {values.discount}%</p>}

                <div className="flex flex-row justify-center">
                    <div className="mx-8" onClick={() => {
                        setEdit('update') 
                        setElementUpdate(values)
                
                    }} class="mx-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        modifier
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div className="mx-8" onClick={() => {
                        APIdelete(values.id)
                
                    }} class="mx-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        supprimé
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div className="mx-8" onClick={() => {
                        setEdit('discount') 
                        setElementUpdate(values)
                
                    }} class="mx-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        reduction
                        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>
                </div>
                    
                </div>
            </article>
        </div>
    )
}

export default Cart;