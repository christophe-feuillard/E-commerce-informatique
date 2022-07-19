import React, {useState,useEffect} from 'react';
import {useNavigate,Navigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import axios from "axios";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [islogin, setIslogin] = useState(false);

    const inputData = [{
        name : 'email', type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    },
    {
        name: 'pwd', type: 'password',placeholder: 'Mots de passe',value: password,change: (e) => setPassword(e.target.value)
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
        url: '/api/login_check',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then((response) => {
        localStorage.setItem("token",response.data.token);
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
            <h2>Se connecter</h2>
            {error && <p className='error'>{error}</p>}
            <div className='loginFormulaire'>
                {inputData.map((input) => (
                    <Input key={input.name} type={input.type} placeholder={input.placeholder} value={input.value} change={input.change}/>
                ))}
                <Button value={"Se connecter"} handelclick={()=>verifyValue()}/>
                <p>Vous n'avez pas de compte ? <span className='connect' onClick={()=> navigate("/register")}>Inscrivez-vous</span></p>
            </div>
        </div>
    </div>
  )
}

export default Login;