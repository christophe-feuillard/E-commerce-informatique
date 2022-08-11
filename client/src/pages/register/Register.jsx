import React, {useState,useEffect} from 'react';
import {useNavigate,Navigate} from 'react-router-dom';
import InputLogin from '../../components/input/InputLogin';
import InputRegister from '../../components/input/InputRegister';
import Button from "../../components/button/Button";
import axios from 'axios';
import Image from '../../asset/pc.jpg'
import './Register.css';
import { AiFillAmazonSquare } from 'react-icons/ai';
import { GetGlobalData } from '../../useContext/AuthProviders';


const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ville, setVille] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [error, setError] = useState('');
    const [islogin, setIslogin] = useState(false);


    const inputTop = [{
        type: 'text',placeholder: 'Name',value: name,change: (e) => setName(e.target.value)
    },
    {
        type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    }
    ]
    const inputData = [
    {
        type: 'text',placeholder: 'Address',value: address,change: (e) => setAddress(e.target.value)
    },
    {
        type: 'text',placeholder: 'Ville',value: ville,change: (e) => setVille(e.target.value)
    },
    {
        type: 'text',placeholder: 'Code Postal',value: codePostal,change: (e) => setCodePostal(e.target.value)
    },
    {
        type: 'text',placeholder: 'Numero de telephone',value: phone,change: (e) => setPhone(e.target.value)
    },
    {
        type: 'password',placeholder: 'Mots de passe',value: password,change: (e) => setPassword(e.target.value)
    }];
    
    useEffect(() => {
        if(localStorage.getItem('token')) setIslogin(true);
    },[]);

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
            "code_postal": codePostal,
            "phone": phone
        });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8000/account/register',
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
    if(islogin) return <Navigate to="/home"/> ;
    return (
    <div className='registerMain'>
        <div className='DivRegisterText'>
            <p className='RegisterText' >Création d'un compte</p>
        </div>
        <div className='registerContainer'>
          
            <div className='displayFlexRegister'>
                
            <div className='ImgDivSide'>
                <img className='ImgSide' src={Image} alt="" />
            </div>
            <div className='registerFormulaire'>
                <div className='insideBackgroundWhite'>
                <div className='inputDivRegister'>
            {inputTop.map((input, key) => (
                <InputRegister key={key} type={input.type} value={input.value}  placeholder={input.placeholder}  change={input.change}/>
                ))}
                </div>
                <div className='inputDivLogin'>
                {inputData.map((input, key) => (
                    <InputLogin key={key} type={input.type} value={input.value}  placeholder={input.placeholder}  change={input.change}/>
                    ))}
                    </div>
                    </div>
             
                <Button className='buu'  value={"S'inscrire"} handelclick={()=>verifyValue()}/>
                <p className='Already'>Vous avez déjà un compte ? <span className='connect' onClick={()=> navigate("/login")}>Connectez-vous</span></p>
                 
            </div>
            </div>
            {error && <p className='error'>{error}</p>}
        </div>
    </div>
  )
}

export default Register;
