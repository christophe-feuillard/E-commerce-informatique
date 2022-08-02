import React, {useEffect,useState} from 'react';
import axios from 'axios';

const Data = () => {
    const [dataUser, setdataUser] = useState([]);
    const [dataAllPanier, setdataAllPanier] = useState([]);
    const Token = localStorage.getItem("token");

    useEffect(() => {
        const callAPI = async () => {
            await axios.get('https://localhost:8000/api/user/role', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`
                }
            })
            .then(res => {
                setdataUser(res.data);
                console.log(res.data)
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI();
    }, []);

    useEffect(() => {
        const callAPI = () => {
            axios.get('https://localhost:8000/api/panier', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`
                }
            })
            .then(res => {
                setdataAllPanier(res.data);
            })
            .catch(err => {
            console.log(err);
            });
        }
        callAPI();
    }, []);

    console.log(dataAllPanier, 'jff')
}

export default Data;
