import React, {useState} from 'react';
import Input from '../../components/input/Input';
import Button from "../../components/button/Button";
import './Register.css';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ville, setVille] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    
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
  
    return (
    <div className='registerMain'>
        <div className='registerContainer'>
            <h2>S'inscrire</h2>
            <div className='registerFormulaire'>
                {inputData.map((input) => (
                    <Input type={input.type} placeholder={input.placeholder} value={input.value} change={input.change}/>
                ))}
                <Button value={"S'inscrire"}/>
                <p>Vous avez déjà un compte ? <span className='connect'>Connectez-vous</span></p>
            </div>
        </div>
    </div>
  )
}

export default Register;