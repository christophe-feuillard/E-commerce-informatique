import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputData = [{
        type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    },
    {
        type: 'password',placeholder: 'Mots de passe',value: password,change: (e) => setPassword(e.target.value)
    }];

  return (
    <div className='loginMain'>
        <div className='loginContainer'>
            <h2>Se connecter</h2>
            <div className='loginFormulaire'>
                {inputData.map((input) => (
                    <Input type={input.type} placeholder={input.placeholder} value={input.value} change={input.change}/>
                ))}
                <Button value={"Se connecter"}/>
                <p>Vous n'avez pas de compte ? <span className='connect' onClick={()=> navigate("/register")}>Inscrivez-vous</span></p>
            </div>
        </div>
    </div>
  )
}

export default Login