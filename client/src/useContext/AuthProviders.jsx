import axios from 'axios';
import React, {createContext, useContext, useState} from 'react'
import { useEffect } from 'react';

const globalData = createContext(null);


export const GetGlobalData = () => {
    return useContext(globalData);
}


export const AuthProviders = ({children}) => {
    const [store, setStore] = useState([])
    const [total, setTotal] = useState(0)
    const [user, setInfoUser] = useState([])
    const [login,setlogin] = useState(false);
    

    useEffect(() => {
     const getItemInStore  = JSON.parse(localStorage.getItem("store"))

     if( localStorage.getItem("token") != null) setlogin(true);
     else setlogin(false);

     if (getItemInStore) {
       setStore(getItemInStore);
     }
    }, [])

    const Token = localStorage.getItem("token");
    var config = {
      method: 'get',
      url: 'https://localhost:8000/api/user/role',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`
        }
      };  

           useEffect(() => {
      axios(config)
        .then(response => {
          console.log(response.data)
        setInfoUser(response.data)
        })
        .catch(error => {
          console.log(error);
        });
       }, [])


    useEffect(() => {
        console.log(store,'store')
        localStorage.setItem("store", store && JSON.stringify(store));
        setTotal(store.reduce((actuel,item) => actuel + item.prix * item.quantity,0));
        // setArticleNumber(store.length);
      },[store]);


      const data = {contextStore: [store, setStore], 
        contextTotal:[total, setTotal],
        contextLog:[login,setlogin],
        contextUser:[user, setInfoUser]
    }





  
  return (
    <globalData.Provider value={data}>
        {children}
  </globalData.Provider>
  )
}

export default AuthProviders
