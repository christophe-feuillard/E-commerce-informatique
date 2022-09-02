import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getUser } from '../admin/requette/requette';


const navigate = useNavigate

const globalData = createContext(null);


export const GetGlobalData = () => {
  return useContext(globalData);
  
}


export const AuthProviders = ({ children }) => {
  const [store, setStore] = useState([])
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState(null)
  const [role,setRole] = useState();
  const [token,setToken] = useState(null);
  const [paypal, setPaypal] = useState(null)

 
  useEffect(() => {
    const getItemInStore = JSON.parse(localStorage.getItem("store"))
    const getTokenLocalStorage = JSON.parse(localStorage.getItem("token"))  

    if (getTokenLocalStorage){
      setToken(getTokenLocalStorage);
    } 

    if (getItemInStore) {
      setStore(getItemInStore);
    }
    
  }, [])



useEffect(() => {

  const userData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/role", {headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }})
        

        setUser(response.data)
      } catch (error) {
        console.log(error)
        if(error.response.data.code === 401){
          console.log('VOUS AVEZ ETE DECONNECTER CAR VOTRE TOKEN A EXPIRER')
          localStorage.removeItem('token')
          setUser(null)
          navigate('/login')
        }
      }
  }

  if(token) {
    userData()
  }
    if (token !== null) {
      localStorage.setItem("token", token && JSON.stringify(token))
    }
}, [token])

  useEffect(() => {
    localStorage.setItem("store", store && JSON.stringify(store));
    setTotal(store.reduce((actuel, item) => actuel + item.prix * item.quantity, 0));
    // setArticleNumber(store.length);
  }, [store]);


  const data = {
    contextStore: [store, setStore],
    contextTotal: [total, setTotal],
    contextToken: [token, setToken],
    contextUser: [user, setUser],
    contextPaypal: [paypal, setPaypal],
  }

  return (
    <globalData.Provider value={data}>
      {children}
    </globalData.Provider>
  )
}

export default AuthProviders
