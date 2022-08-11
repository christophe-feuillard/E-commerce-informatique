import React, { useEffect, useState } from 'react'
import { getCountry } from '../../requette/requette'
import Banlist from './Banlist'
import { BanCountry } from '../../requette/requette'
import { GetGlobalData } from '../../../useContext/AuthProviders'

function Banmethode() {
    const [country, setCountry] = useState([])
    const {contextToken} = GetGlobalData();
    const [token] = contextToken;
  
useEffect(()=> getCountry(setCountry, token),[])

const initialValues = {
    country: "",
    option: ""
  };

const [values, setValues] = useState(initialValues);
const handleInputChange = (e) => {

    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };  
console.log(values)
  return (
    <div className='flex flex-col justify-items-center'>
        <div>
               <p>Restriction par pays</p>
                <label  for="country" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400" >choisir une option</label>
                <select onChange={handleInputChange} name='country' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Choisir un pays</option>
                {country.map((c)=>{
                    return(
                        <option value={c}>{c}</option>
                    )
                })}
                </select>
        </div>
      
        <div>
            <label for="option" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">choisir une option</label>
        <select onChange={handleInputChange} name='option' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>choisir une option</option>
        <option value="paypal">paypal</option>
        <option value="carte bancaire">carte bancaire</option>
        </select>
        </div>
        

        <div className="flex justify-center">
             <button onClick={()=> BanCountry(values, token)}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-4 rounded">Ajouter une restriction</button>
        </div>
        <Banlist/>
    </div>
  )
}

export default Banmethode