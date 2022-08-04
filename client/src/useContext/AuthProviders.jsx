import React, {createContext, useContext, useState} from 'react'
import { useEffect } from 'react';

const globalData = createContext(null);


export const GetGlobalData = () => {
    return useContext(globalData);
}


export const AuthProviders = ({children}) => {
    const [store, setStore] = useState([])
    const [total, setTotal] = useState(0)
    const [login,setlogin] = useState(false);
    

    useEffect(() => {
     const getItemInStore  = JSON.parse(localStorage.getItem("store"))

     if( localStorage.getItem("token") != null) setlogin(true);
     else setlogin(false);

     if (getItemInStore) {
       setStore(getItemInStore);
     }
    }, [])



    useEffect(() => {
        console.log(store,'store')
        localStorage.setItem("store", store && JSON.stringify(store));
        setTotal(store.reduce((actuel,item) => actuel + item.prix * item.quantity,0));
        // setArticleNumber(store.length);
      },[store]);


      const data = {contextStore: [store, setStore], 
        contextTotal:[total, setTotal],
        contextLog:[login,setlogin]
    }
    
  return (
    <globalData.Provider value={data}>
        {children}
  </globalData.Provider>
  )
}

export default AuthProviders
