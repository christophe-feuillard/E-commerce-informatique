import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { array } from 'prop-types';

const dataFDP = () => {
    const [dataUser, setdataUser] = useState([]);
    const [dataPanier, setdataPanier] = useState([]);

    const fromAdress = (array(
        'company' = 'Ecommerce',
        'street1' = '55 avenue de la Grande Armée ',
        'city' = 'Paris',
        'zip' = '75116',
        'phone' = '0155312897'
    ));
    
    const toAdress = (array(
        'name' = `${dataUser.name}`,
        'street1' = `${dataUser.adresse}`,
        'city' = `${dataUser.city}`,
        'zip' = `${dataUser.code_postal}`,
        'phone' = `${dataUser.phone}`
    ));

    useEffect(() => {
        const callAPI = () => {
            axios.get('/user/role')
            .then(res => {
                setdataUser(res.data);
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI;
    }, []);

    useEffect(() => {
        const callAPI = () => {
            axios.get('/api/panier')
            .then(res => {
                setdataPanier(res.data);
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI;
    }, []);
}

export default dataFDP;