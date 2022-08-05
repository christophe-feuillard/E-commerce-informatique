import React, {useEffect} from 'react';
import axios from 'axios';

const Data = () => {
    const Token = localStorage.getItem("token");    
    const dataStorage = JSON.parse(localStorage.getItem('store'));
  
    useEffect(() => {

        var config = {
            method: 'post',
            url: 'http://localhost:8000/api/FDP',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Token}`
            },
            data : dataStorage
          };
        const SendAPI = async () => {
             axios(config)
            .then(res => {
                console.log(res.data);
                console.log(dataStorage);
            })
            .catch(err => {
            console.log(err);
            });
        }
        SendAPI();
    }, []);
}

// CALL Data => onclick PAYER PANIER => CALCUL DES FDP 
export default Data;
