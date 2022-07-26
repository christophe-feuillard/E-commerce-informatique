import React, {useEffect,useState} from 'react';
import axios from 'axios';
const Token = localStorage.getItem("token");


const Data = () => {
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
                console.log(dataUser)
              })
              .catch((error) => {
                    console.log(error);
              });
        }, []);

    useEffect(() => {
        const callAPI = () => {
            axios.get('/api/panier')
            .then(res => {
                setdataPanier(res.data);
                console.log(dataPanier)
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI();
    }, []);
}

export default Data;