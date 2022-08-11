import React,{useEffect, useState} from 'react'
import { getUsers } from "../../requette/requette";
import User from "../user/User"

function Usercontainer({setEdit, setElementUpdate}) {
const [userData, setUserData] = useState([])

useEffect(() => {
    getUsers(setUserData);
    },[]);

  return(
    <div class="p-4 w-2/4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-full" >
        <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Utilisateurs</h5>
        </div>
   <div class="flow-root ">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700 ">
        {userData.map(v => {return <User data={v}  setEdit={setEdit} setElementUpdate={setElementUpdate}/>} )}
        </ul>
   </div>
    </div>
  )
    
 
}

export default Usercontainer