
import axios from 'axios';
import { GetGlobalData } from '../../useContext/AuthProviders';


const Data = () => {

  const {contextStore, contextToken} = GetGlobalData();
  const [store] = contextStore;
  const [token] = contextToken;

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
