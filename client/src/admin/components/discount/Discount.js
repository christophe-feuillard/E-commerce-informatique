import {useState} from 'react'
import { GetGlobalData } from '../../../useContext/AuthProviders';
import { setDiscount, removeDiscount } from '../../requette/requette';


function Discount({elementUpdate, setEdit, setElementUpdate}) {
    const {contextToken} = GetGlobalData();
    const [token] = contextToken;
  
        const initialValues = {
        persentDiscount: elementUpdate.dicount,
        start : elementUpdate.start,
        end : elementUpdate.end
      };

      const [values, setValues] = useState(initialValues);
      const handleInputChange = (e) => {
  
          const { name, value } = e.target;
      
          setValues({
            ...values,
            [name]: value,
          });
          
        };  
if(!elementUpdate.discount){
    
    return (
        <div class="relative z-0 mb-6 w-full group px-96">
            <div className='py-4'>
                <p>
                    Ajouter une reduction a {elementUpdate.titre}
                </p>
            </div>
            <div>
                <label for='discount'>reduction</label>
                <input class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" type='text' placeholder='taux en pourcentage' name='persentDiscount' onChange={handleInputChange}/>
            </div>
            
            <div date-rangepicker class="flex items-center">
            <div class="relative">
                    <label for='start'>Debut de la promotion</label>
                <input name="start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date de debut" onChange={handleInputChange}/>
            </div>
            <div class="relative">
                    <label for='end'>Fin de la promotion</label>
                <input name="end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date de fin" onChange={handleInputChange}/>
            </div>
            </div>

            <div className='py-4'>
            <button 
            onClick={()=> {setDiscount(elementUpdate.id, values, setEdit, token)}}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-4 rounded">
                ajouter la reduction
            </button>
            </div>
        </div>
    )
}else{
    return(
        <div class="relative z-0 mb-6 w-full group px-96">
            <div className='py-4'>
                <p>
                    une reduction de {elementUpdate.discount}% est deja en cours sur le produit {elementUpdate.titre} pour effectuer une reduction vous devez supprimer la reduction actuel en cliquant sur le boutton
                </p>
            </div>

            <div className='py-4'>
            <button 
            onClick={()=> {removeDiscount(elementUpdate, setEdit, setElementUpdate, token)}}
            class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-4 rounded">
                supprimer la reduction
            </button>
            </div>
        </div>
    )
}


}

export default Discount