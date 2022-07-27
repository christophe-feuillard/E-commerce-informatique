import React, {useEffect,useState} from 'react';
import axios from 'axios';
const Token = localStorage.getItem("token");


const Data = () => {
    const [dataUser, setdataUser] = useState([]);
    const [dataAllPanier, setdataAllPanier] = useState([]);
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
        length: dataPanier.lenght,
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
            var config = {
                method: 'get',
                url: '/api/user/role',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Token}`
                },

                data : fromAdress
              };
              axios(config)
              .then((response) => {
                setdataUser(response.data);
                console.log(response)
              })
              .catch((error) => {
                    console.log(error);
              });
        }, []);

    useEffect(() => {
       console.log( JSON.parse(localStorage.getItem("store")))
    }, []);
    // console.log(shipment);
    // console.log(dataUser, 'dataUser')
    console.log(dataAllPanier, 'dataAllPanier')
    console.log(dataPanier, 'dataPanier')
}

export default Data;
