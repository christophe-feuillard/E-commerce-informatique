import React from "react";
import './input.css'

const Input = ({dataTochange, handleChange, handleSubmit}) => {
    
    return (
        <div>
            <p>{dataTochange.photo}</p>
            <form onSubmit={handleSubmit}>
            {Object.keys(dataTochange).map(function(key, value) {
               
            return (
            <div>
                <label for={key}>
                    {key}
                </label>
                <input type="text" name={key} value={dataTochange[key]} onChange={handleChange}/>
            </div> )
            })}
            </form>
        </div>
        
    )
}

export default Input