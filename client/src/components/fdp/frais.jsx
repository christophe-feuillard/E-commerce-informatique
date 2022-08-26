import React, {useEffect} from 'react';
import axios from 'axios';
import { GetGlobalData } from '../../useContext/AuthProviders';


const Data = () => {

  const {contextStore, contextTotal, contextToken, contextUser} = GetGlobalData();
  const [store] = contextStore;
  const [total] = contextTotal;
  const [token] = contextToken;
  const [user] = contextUser;

  console.log(token)

    var config = {
        method: 'POST',
        url: 'http://localhost:8000/api/FDP',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data : store
      };
         axios(config)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
        console.log(err);
        }); 
}

export default Data;
