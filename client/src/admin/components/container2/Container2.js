import {useState, useEffect} from 'react'
import Cart from '../cart/Cart'
import '../containerCart/ContainerCart.css'
import { getItem } from "../../requette/requette";
import { GetGlobalData } from '../../../useContext/AuthProviders';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import  {useRef} from 'react';

const Container2 = ({setEdit, setElementUpdate, edit}) => {
    const [data, setData] = useState([])

    const {contextToken} = GetGlobalData();
    const [token] = contextToken;
    const tableRef = useRef(null);

    useEffect(() => {
     getItem(setData, token);
        
     },[edit]);

     
    return (
        <div className='Container'>
            <div className='flex flex-wrap justify-center '>
                {data.map(v =>{ return <Cart values={v} setEdit={setEdit} setElementUpdate={setElementUpdate} edit={edit} />})}
            </div>
            <DownloadTableExcel
                    filename="article table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                    
                >

                   <button  className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full'> Exporter les utilisateur via excel </button>
                </DownloadTableExcel>
                <div>
                <table className='hidden' ref={tableRef}>
                 <tbody>
                    <tr>
                      <th>Id</th>
                        <th>Titre</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Caracteristique</th>
                        <th>lenght</th>
                        <th>width</th>
                        <th>weight</th>
                        <th>height</th>
                        <th>photo</th>
                        <th>stock</th>
                        <th>visit</th>
                        <th>promotion</th>
                        <th>debut de promotion</th>
                        <th>fin de promotion</th>
                        <th>Date de creation</th>
                    </tr>
       
                    {data.map((product) => (
                    <tr>
                         <td>
                    {product.id}
                      </td>
                      <td>
                    {product.titre}
                      </td>
                      <td>
                    {product.prix}
                      </td>
                      <td>
                    {product.caracteristique}
                      </td>
                      <td>
                    {product.lenght}
                      </td>
                      <td>
                    {product.width}
                      </td>
                      <td>
                    {product.weight}
                      </td>
                      <td>
                    {product.height}
                      </td>
                      <td>
                    {product.photo}
                      </td>
                      <td>
                    {product.stock}
                      </td>
                      <td>
                    {product.visit}
                      </td>
                      <td>
                    {product.discount}
                      </td>
                      <td>
                    {product.startDiscount}
                      </td>
                      <td>
                    {product.endDiscount}
                      </td>
                      <td>
                    {product.createf_at}
                      </td>

                    </tr>
                     ))}
                    
                  </tbody>
                </table>

            </div>
        </div>
        
      );
}

export default Container2;