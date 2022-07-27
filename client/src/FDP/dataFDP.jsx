import React, {useEffect,useState} from 'react';
import axios from 'axios';

const DataFDP = () => {
    const [dataUser, setdataUser] = useState([]);
    const [dataAllPanier, setdataAllPanier] = useState([]);
    const Token = localStorage.getItem("token");

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
        length: dataAllPanier.lenght,
        width: dataAllPanier.width,
        height: dataAllPanier.height,
        weight: dataAllPanier.weight,
    });

    const shipment = ({
        to_address: toAdress,
        from_address: fromAdress,
        parcel: parcel
      }); 

    useEffect(() => {
        const callAPI = () => {
            axios.get('/api/user/role', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + Token
                }
            })
            .then(res => {
                setdataUser(res.data);
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI();
    }, []);

    useEffect(() => {
        const callAPI = () => {
            axios.get('/api/panier')
            .then(res => {
                setdataAllPanier(res.data);
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI();
    }, []);

    console.log(shipment);
    console.log(dataUser, 'dataUser')
    // console.log(dataAllPanier, 'dataAllPanier')
    // console.log(dataPanier, 'dataPanier')
}

export default DataFDP;