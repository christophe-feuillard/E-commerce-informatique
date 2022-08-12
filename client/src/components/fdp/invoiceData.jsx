import React, {useEffect} from 'react';
import axios from 'axios';

const InvoiceData = () => {
    const Token = localStorage.getItem("token");    
    const dataStorage = JSON.parse(localStorage.getItem('store'));

    useEffect(() => {

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/Invoice',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            },
            data : dataStorage
          };
        const SendAPI = async () => {
             axios(config)
            .then(res => res.data)
            .catch(err => {
            console.log(err);
            });
        }
        // console.log(dataStorage, 'dataStorage');
        SendAPI();
    }, []);
}

export default InvoiceData;