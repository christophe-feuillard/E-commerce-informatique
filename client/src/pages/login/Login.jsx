import React, {useState,useEffect} from 'react';
import {useNavigate,Navigate} from 'react-router-dom';
import InputLogin from '../../components/input/InputLogin';
import Button from "../../components/button/Button";
import { GetGlobalData } from '../../useContext/AuthProviders';

import axios from "axios";
import './Login.css';
import { AiFillWarning } from 'react-icons/ai';

const Login = () => {
    const navigate = useNavigate();
    
    const {contextStore, contextUser, contextToken} = GetGlobalData();
    const [store, setStore] = contextStore
    const [user, setUser] = contextUser
    const [token, setToken] = contextToken
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [islogin, setIslogin] = useState(false);

    const inputData = [{
        type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    },
    {
        type: 'password',placeholder: 'Mot de passe',value: password,change: (e) => setPassword(e.target.value)
    }];

    useEffect(() => {
        if(localStorage.getItem('token')) setIslogin(true);
    },[]);

    const verifyValue = () => {
        const regexVoidAndSpace = /^\s*$/;
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
        const regexPassword = /^[a-zA-Z0-9]{6,}$/;

        if(regexVoidAndSpace.test(email) || regexVoidAndSpace.test(password)) setError('Veuillez remplir tous les champs');
        else if(!regexEmail.test(email)) setError('Veuillez entrer un email valide');
        else if(!regexPassword.test(password)) setError('Veuillez entrer un mot de passe valide');
        else{
          setError('');
          callAPI();
        }
    }

    const callAPI = () => {
      var data = JSON.stringify({
        "email": email,
        "password": password
      });
      
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/login_check',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then((response) => {
        setToken(response.data.token)
        localStorage.setItem("token",JSON.stringify(response.data.token));
        navigate('/home');
      })
      .catch((error) => {
        if(error.response.data.code === 401) setError('Email ou mot de passe incorrect');
        else setError('Une erreur est survenue');
      });
      
    }
    if(islogin) return <Navigate to="/home"/> ;
  return (
    <div className='loginMain'>
        <div className='loginContainer'>
          <div className='DivTextLogin'>
            <p className='TextLogin'>Se connecter</p>
          </div>
       
            <div className='loginFormulaire'>
                {inputData.map((input, key) => (
                    <InputLogin key={key} type={input.type} value={input.value}  placeholder={input.placeholder} change={input.change}/>
                ))}
                <Button value={"Se connecter"} handelclick={verifyValue}/>
                <p className='Already' >Vous n'avez pas de compte ? <span className='connect' onClick={()=> navigate("/register")}>Inscrivez-vous</span></p>
            </div>
        {error && <p className='error'> {error}</p>}
        </div>
    </div>
  )
}

export default Login;