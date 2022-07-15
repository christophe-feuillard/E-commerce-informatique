import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import axios from 'axios';
import './Register.css';

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ville, setVille] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const inputData = [{
        type: 'text',placeholder: 'Name',value: name,change: (e) => setName(e.target.value)
    },
    {
        type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    },
    {
        type: 'text',placeholder: 'Address',value: address,change: (e) => setAddress(e.target.value)
    },
    {
        type: 'text',placeholder: 'Ville',value: ville,change: (e) => setVille(e.target.value)
    },
    {
        type: 'text',placeholder: 'Numero de telephone',value: phone,change: (e) => setPhone(e.target.value)
    },
    {
        type: 'password',placeholder: 'Mots de passe',value: password,change: (e) => setPassword(e.target.value)
    }];
    
    const verifyValue = () => {

        const regexName = /^[a-zA-Z]{2,}$/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        const regexPhone = /^0[1-9]([-. ]?[0-9]{2}){4}$/;
        const regexVoidAndSpace = /^\s*$/;

        if(regexVoidAndSpace.test(name) || regexVoidAndSpace.test(email) || regexVoidAndSpace.test(address) || regexVoidAndSpace.test(ville) || regexVoidAndSpace.test(phone) || regexVoidAndSpace.test(password)) setError('Veuillez remplir tous les champs');
        else if(!regexName.test(name)) setError('Veuillez entrer un nom valide');
        else if(!regexEmail.test(email)) setError('Veuillez entrer un email valide');
        else if(!regexPhone.test(phone)) setError('Veuillez entrer un numero de telephone valide');
        else if(password.length < 6) setError('Veuillez entrer un mot de passe de 6 caracteres minimum');
        else{
            setError('');
            callAPI();
        }
    }

    const callAPI = () => {

        const data = JSON.stringify({
            "name": name,
            "adresse": address,
            "email": email,
            "password": password,
            "ville": ville,
            "phone": phone
        });
          
          var config = {
            method: 'post',
            url: '/account/register',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then((response) => {
                navigate('/login');
            if(JSON.stringify(response.data) === "parfait"){
                navigate('/login');
            }
          })
          .catch((error) => {
            console.log(error);
          });
          
    }
    return (
    <div className='registerMain'>
        <div className='registerContainer'>
            <h2>S'inscrire</h2>
            {error && <p className='error'>{error}</p>}
            <div className='registerFormulaire'>
                {inputData.map((input) => (
                    <Input type={input.type} placeholder={input.placeholder} value={input.value} change={input.change}/>
                ))}
                <Button value={"S'inscrire"} handelclick={()=>verifyValue()}/>
                <p>Vous avez déjà un compte ? <span className='connect'>Connectez-vous</span></p>
            </div>
        </div>
    </div>
  )
}

export default Register;