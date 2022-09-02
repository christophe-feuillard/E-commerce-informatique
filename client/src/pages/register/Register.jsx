import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import InputLogin from '../../components/input/InputLogin';
import InputRegister from '../../components/input/InputRegister';
import Button from "../../components/button/Button";
import axios from 'axios';
import Image from '../../asset/pc.jpg'
import './Register.css';


const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [ville, setVille] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [password, setPassword] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [error, setError] = useState('');
    const [islogin, setIslogin] = useState(false);


    const inputTop = [{
        type: 'text',placeholder: 'Nom',value: name,change: (e) => setName(e.target.value)
    },
    {
        type: 'text',placeholder: 'Prénom',value: firstname,change: (e) => setFirstname(e.target.value)
    }
    ]
    const inputData = [

    {
        type: 'text',placeholder: 'Email',value: email,change: (e) => setEmail(e.target.value)
    },
    {
        type: 'text',placeholder: 'Adresse',value: address,change: (e) => setAddress(e.target.value)
    },
    {
        type: 'text',placeholder: 'Ville',value: ville,change: (e) => setVille(e.target.value)
    },
    {
        type: 'text',placeholder: 'Code Postale',value: codePostal,change: (e) => setCodePostal(e.target.value)
    },
    ,
    {
        type: 'date',placeholder: 'Numero de téléphone',change: (e) => setDate(e.target.value)
    },
    {
        type: 'text',placeholder: 'Numero de téléphone',value: phone,change: (e) => setPhone(e.target.value)
    },
    {
        type: 'password',placeholder: 'Mot de passe',value: password,change: (e) => setPassword(e.target.value)
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
            "firstname": firstname,
            "adresse": address,
            "email": email,
            "password": password,
            "ville": ville,
            "codepostal": codePostal,
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
