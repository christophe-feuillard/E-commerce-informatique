import React, {useEffect,useState} from 'react';
import axios from 'axios';

const dataFDP = () => {
    const [dataUser, setdataUser] = useState([]);
    const [dataPanier, setdataPanier] = useState([]);

    const fromAdress = ({
        company : 'Ecommerce',
        street1 : '55 avenue de la Grande Armée ',
        city : 'Paris',
        zip : '75116',
        phone : '0155312897'
    });

    const toAdress = ({
        name: dataUser.name,
        street1 : dataUser.adresse,
        city : dataUser.city,
        zip : dataUser.code_postal,
        phone : dataUser.phone
    });

    const parcel = ({
        length: dataPanier.length,
        width: dataPanier.width,
        height: dataPanier.height,
        weight: dataPanier.weight,
    });

    const shipment = ({
        to_address: toAdress,
        from_address: fromAdress,
        parcel: parcel
      }); 

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