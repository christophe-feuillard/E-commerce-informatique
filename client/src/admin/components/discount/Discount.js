import {useState} from 'react'
import { setDiscount, removeDiscount } from '../../requette/requette';

function Discount({elementUpdate, setEdit, setElementUpdate}) {
      
        const initialValues = {
        persentDiscount: elementUpdate.dicount
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
            <div className='py-4'>
            <button 
            onClick={()=> {setDiscount(elementUpdate.id, values, setEdit)}}
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
            onClick={()=> {removeDiscount(elementUpdate, setEdit, setElementUpdate)}}
            class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-4 rounded">
                supprimer la reduction
            </button>
            </div>
        </div>
    )
}


}

export default Discount