import React,{useEffect, useState} from 'react'
import { GetGlobalData } from '../../../useContext/AuthProviders';
import { getUsers } from "../../requette/requette";
import User from "../user/User"
import  {useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Usercontainer({setEdit, setElementUpdate}) {
const [userData, setUserData] = useState([])
const {contextToken} = GetGlobalData();
const [token] = contextToken;

const tableRef = useRef(null);

useEffect(() => {
    getUsers(setUserData, token);
    },[]);
  return(
    
    <div class="p-4 w-2/4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-full" >
        <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Utilisateurs</h5>
        </div>
   <div class="flow-root ">
        <ul role="list" class=" ">
        {userData.map(v => {return <User data={v}  setEdit={setEdit} setElementUpdate={setElementUpdate}/>})}
        </ul>
   </div>
        <DownloadTableExcel
                    filename="users table"
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
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>email</th>
                        <th>Birthdate</th>
                        <th>addresse</th>
                        <th>code postal</th>
                        <th>Pays</th>
                        <th>Ville</th>
                        <th>Téléphone</th>
                        <th>Banissement</th>
                        <th>Track</th>
                        <th>Adresse de livraison</th>
                    </tr>
       
                    {userData.map((product) => (
                    <tr>
                         <td>
                    {product.id}
                      </td>
                      <td>
                    {product.Firstname}
                      </td>
                      <td>
                    {product.name}
                      </td>
                      <td>
                    {product.email}
                      </td>
                      <td>
                    {product.birthdate}
                      </td>
                      <td>
                    {product.adresse}
                      </td>
                      <td>
                    {product.CodePostal}
                      </td>
                      <td>
                    {product.Country}
                      </td>
                      <td>
                    {product.ville}
                      </td>
                      <td>
                    {product.phone}
                      </td>
                      <td>
                    {product.BanMethode}
                      </td>
                    </tr>
                     ))}
                    
                  </tbody>
                </table>

            </div>

    </div>
  )
    
 
}

export default Usercontainer