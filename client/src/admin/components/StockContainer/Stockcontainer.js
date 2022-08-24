import React from 'react'
import './stockcontainer.css'
export default function Stockcontainer({data, setEdit, setElementUpdate}) {
  
    return (
        <tr className="border-b px">
      <td className='text-center'> 
            <p>
            {data.titre}
            </p>
        </td>
      <td className='flex items-center justify-center'><img className='object-contain h-48 w-96' src={data.photo}/></td>
      <td className='text-center'>{data.stock} unités
      {/* {data.stock === 0 &&  <p className='redstock'>Rupture de stock</p>} */}
      {data.stock == 0  && <p className='redstock'>stock épuisé</p>}
         {data.stock <= 100  && <p className='text-orange-500'>stock faible</p>}
        {data.stock >= 100 && <p className='text-green-500'>stock suffisant</p>}
            <div className="mx-8" onClick={() =>{setEdit('update'); setElementUpdate(data);}} class="mx-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        modifier le stock
                        <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>
      </td>
    </tr >
    )
}
