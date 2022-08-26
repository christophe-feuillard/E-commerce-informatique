import React, {useEffect} from 'react';
import axios from 'axios';
import { GetGlobalData } from '../../useContext/AuthProviders';


const InvoiceData = () => {

  const {contextStore, contextTotal, contextToken, contextUser} = GetGlobalData();
  const [store] = contextStore;
  const [total] = contextTotal;
  const [token] = contextToken;
  const [user] = contextUser;


console.log(store, 'PANIER')
console.log(token, 'TOKEN')
console.log(total, 'TOTAL')
console.log(user, 'USER')

    // const Token = localStorage.getItem("token");    
    // const dataStorage = JSON.parse(localStorage.getItem('store'));

    useEffect(() => {

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/Invoice',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            data : store
          };
        const SendAPI = async () => {
             axios(config)
            .then(res => console.log(res.data))
            .catch(err => {
            console.log(err);
            });
        }
        SendAPI();
    }, []);
}

export default InvoiceData;