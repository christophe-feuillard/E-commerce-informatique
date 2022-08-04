import {useEffect, useState} from "react";
import './input.css'
import { APIupdate, APIadd } from "../../requette/requette";



const Input = ({dataTochange, isCreated, setEdit, edit}) => {

    const initialValues = {
        titre: dataTochange.titre,
        prix: dataTochange.prix,
        photo: dataTochange.photo,
        description: dataTochange.description,
        caracteristique: dataTochange.caracteristique,
        stock: dataTochange.stock,
      };
    
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {

        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
      };  

    return (
        <div class="relative z-0 mb-6 w-full group px-96">
            {Object.keys(dataTochange).map(function(key, value) {
                if(key !== 'id'){
                  return (
                    <div className="containerinput">
                      {edit === 'update'  &&  <label for={key}>{key}</label>}
                      
                        <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  type="text" name={key} value={values[key]} placeholder={key} onChange={handleInputChange}/>
                    </div> )  
                }
               
            })}
            <div className="flex justify-center">
              {isCreated ? <button  onClick={() => {APIadd(`/api/admin/add`,values); setEdit('home');}} class="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer l'article</button> : <button  onClick={() => { APIupdate(`/api/admin/update/${dataTochange.id}`,values); setEdit('home');}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enregistrer les changements</button>}

             <button onClick={() => setEdit('home')} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-4 rounded">Retour</button>
            </div>
            

             
             
        </div>
        
    )
}

export default Input