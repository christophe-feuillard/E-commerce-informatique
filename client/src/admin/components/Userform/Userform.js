import React, {useState} from 'react'
import { GetGlobalData } from '../../../useContext/AuthProviders';
import {updateUser} from "../../requette/requette";

function Userform({setEdit,elementUpdate }) {

    const {contextToken} = GetGlobalData();
    const [token] = contextToken;
  console.log(elementUpdate)
    const initialValues = {
        BanMethode: elementUpdate.BanMethode,
        country: elementUpdate.Country,
        adresse: elementUpdate.adresse,
        emballage : elementUpdate.emballage ? elementUpdate.emballage.titre : elementUpdate.emballage,
        ville: elementUpdate.ville,
        email: elementUpdate.email,
        codeP: elementUpdate.CodePostal,
        // emballage: elementUpdate.emballage,
        name: elementUpdate.name,
        phone: elementUpdate.phone,
      };
    
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {

        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
      };  

      console.log(elementUpdate.CodePostal)
  return (
    <div class="relative z-0 mb-6 w-full group px-96">
        <div className='py-4'>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Bannir une option paiment</label>
            <select onChange={handleInputChange} name='BanMethode' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {elementUpdate.BanMethode === null && <option value='' selected>Selection l'option</option>}
            {elementUpdate.BanMethode === null && <option value="paypal">paypal</option>}
            {elementUpdate.BanMethode === null && <option value="carte bancaire">carte Bancaire</option>}
            {elementUpdate.BanMethode !== null && <option selected>{elementUpdate.BanMethode}</option>}
            {elementUpdate.BanMethode === 'paypal' && <option value="carte bancaire">carte Bancaire</option>}
            {elementUpdate.BanMethode === 'carte bancaire' && <option value="paypal">paypal</option>}
            <option value=''>rien</option>
            
            
            </select>
        </div>



        {elementUpdate.emballage ? (
         <div className='py-4'>
         <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">offrir un emballage cadeau</label>
         <select onChange={handleInputChange} name='emballage' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
         <option value={elementUpdate.emballage.titre} selected>{elementUpdate.emballage.titre}</option>
         {elementUpdate.emballage.titre === 'noel' && <option value="anniversaire">anniversaire</option>}
         {elementUpdate.emballage.titre === 'anniversaire' && <option value="noel">noel</option>}
         <option value=''>rien</option>
         </select>
     </div>
      ) : (
        <div className='py-4'>
            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">offrir un emballage cadeau</label>
            <select onChange={handleInputChange} name='emballage' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected></option>
             <option value='' selected>Selection l'option</option>
            <option value="noel">noel</option>
             <option value="anniversaire">anniversaire</option>
            <option value=''>rien</option>
            </select>
        </div>
      )}
       

        <div className='py-4'>
            <label for="name">Nom</label>
            <input  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.name} name='name' onChange={handleInputChange}></input>
        </div>

        <div className='py-4'>
            <label for="email">Email</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.email} name='email'></input>
        </div>

        <div className='py-4'>
            <label for="country">Pays</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.country} name='country'></input>
        </div>

        <div className='py-4'>
            <label for="ville">Ville</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.ville} name='ville'></input>
        </div>

        <div className='py-4'>
            <label for="phone">Numéro de telephone</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.phone} name='phone'></input>
        </div>

        <div className='py-4'>
            <label for="adresse">adresse</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.adresse} name='adresse'></input>
        </div>

        <div className='py-4'>
            <label for="adresse">Code postal</label>
            <input onChange={handleInputChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' value={values.codeP} name='codeP'></input>
        </div>

        <div>
        <button onClick={() =>updateUser(elementUpdate.id, values, setEdit,token )}  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer les changements</button>
    </div>

    </div>

    
    
  )
}

export default Userform