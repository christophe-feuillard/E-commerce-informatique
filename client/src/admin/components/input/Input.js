import {useEffect, useState} from "react";
import './input.css'
import { APIupdate, APIadd } from "../../requette/requette";



const Input = ({dataTochange, isCreated, setEdit}) => {

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
        <div className="containerDivinput">
            {Object.keys(dataTochange).map(function(key, value) {
                if(key != 'id'){
                  return (
                    <div className="containerinput">
                        <label for={key}>
                            {key}
                        </label>
                        <input type="text" name={key} value={values[key]} onChange={handleInputChange}/>
                    </div> )  
                }
               
            })}
            {isCreated ? <h2 className="buttonclikc" onClick={() => {APIadd(`/api/admin/add`,values); setEdit('home');}}>Créer l'article</h2> : <h2 className="buttonclikc" onClick={() => { APIupdate(`/api/admin/update/${dataTochange.id}`,values); setEdit('home');}}>Enregistrer les changements</h2>}
             <h2 className="buttonclikc" onClick={() => setEdit('home')}>retour</h2>
        </div>
        
    )
}

export default Input