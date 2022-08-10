import React, { useEffect, useState } from 'react'
import { getCountryBan } from '../../requette/requette'
import { RemoveBan } from '../../requette/requette';
function Banlist() {

     const [countryBan, setCountryBan] = useState([]);
    useEffect(()=> getCountryBan(setCountryBan), [])

if(countryBan === undefined){
    <p>chargment</p>
}else{
    return(
    <div className='p-10'>
        <div className='border-y-4 border-indigo-500 p-10'>
        <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">restriction CB</p>
        {countryBan[0]?.map((v)=>{
            return (
                <div className='flex flex-row justify-between'>
                    <p>{v}</p>
                    <button onClick={()=> RemoveBan(v)}  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  mx-4 rounded">supprimer la restiction</button>
                </div>
                )
        })}
        </div>
        <div>
        <div>
        <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">restriction Paypal</p>
        {countryBan[1]?.map((v)=>{
            return (
            <div className='flex flex-row justify-between'>
                <p>{v}</p>
                <button onClick={()=> RemoveBan(v)}  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  mx-4 rounded">supprimer la restiction</button>
            </div>
            )
        })}
        </div>
        </div>
    </div>
)
}

}

export default Banlist