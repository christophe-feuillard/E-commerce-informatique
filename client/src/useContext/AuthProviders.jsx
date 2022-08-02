import React, {createContext, useContext, useState} from 'react'
import { useEffect } from 'react';

const globalData = createContext(null);


export const GetGlobalData = () => {
    return useContext(globalData);
}


export const AuthProviders = ({children}) => {
    const [store, setStore] = useState([])
    const [total, setTotal] = useState(0)
    


    useEffect(() => {
     const getItemInStore  = JSON.parse(localStorage.getItem("store"))

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
    }
    
  return (
    <globalData.Provider value={data}>
        {children}
  </globalData.Provider>
  )
}

export default AuthProviders
