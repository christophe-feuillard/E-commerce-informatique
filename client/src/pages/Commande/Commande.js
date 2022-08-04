import axios from 'axios';
import React, { useState } from 'react'
import { RiBankCardFill, RiPaypalFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import InputCard from '../../components/input/InputCard';
import { GetGlobalData } from '../../useContext/AuthProviders';

import './commande.css'





export const Commande = () => {
  
  
      const {contextStore, contextTotal, contextLog} = GetGlobalData();
      const [store] = contextStore;
      const [total] = contextTotal;
      const [login] = contextLog;

  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [ville, setVille] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cardCvc, setCvc] = useState('');
  const [isSave, setIsSave] = useState(false);

  const navigate = useNavigate()
  const states = useLocation();

 const token =  localStorage.getItem("token")
  const GetArticlesInPanier =  store


  const inputName = [
    {

      type: 'text', id: 'name', for: 'name', placeholder: 'name', value: name, change: (e) => setName(e.target.value)

    },
  ]

  const inputAdress = [
    {

      type: 'text', id: 'adress', for: 'adress', placeholder: 'adress', value: adress, change: (e) => setAdress(e.target.value)

    }
  ]


  const inputZip = [
    {
      type: 'text', id: 'zip', for: 'zip', placeholder: 'zip', value: zip, change: (e) => setZip(e.target.value)
    },
  ]

  const inputNameCard = [

    {
      type: 'text', id: 'nameCard', for: 'nameCard', placeholder: 'name card', value: cardName, change: (e) => setCardName(e.target.value)
    }
  ]

  const InputCvc = [

    {
      type: 'text', id: 'cvc', for: 'cvc', placeholder: 'cvc', value: cardCvc, change: (e) => setCvc(e.target.value)
    }
  ]
  const InputCardNumber = [

    {
      type: 'text', id: 'number', for: 'number', placeholder: 'number', value: cardNumber, change: (e) => setCardNumber(e.target.value)
    }
  ]

  const InputCity = [
    {
      type: 'text', id: 'city', for: 'city', placeholder: 'city', value: city, change: (e) => setCity(e.target.value)
    },
  ]
  const InputVille = [
    {
      type: 'text', id: 'ville', for: 'ville', placeholder: 'ville', value: ville, change: (e) => setVille(e.target.value)
    },

  ]
  const InputMonth = [
    {
      type: 'text', id: 'month', for: 'month', placeholder: 'month', value: month, change: (e) => setMonth(e.target.value)
    },
  ]
  const InputYear = [
    {
      type: 'text', id: 'year', for: 'year', placeholder: 'year', value: year, change: (e) => setYear(e.target.value)
    }
  ]


  const handleChange = event => {
    if (event.target.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is NOT checked');
    }
    setIsSave(current => !current);
  };
  

    const callAPI = () => {
      if(isSave){
        var data = JSON.stringify({
          "name": cardName,
          "number": cardNumber,
          "month": month,
          "year": year,
        "cvc": cardCvc
      });
      
      var config = {
        method: 'post',
        url: 'https://localhost:8000/api/payment',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
          console.log(error)
        });
      } else {
        console.log("Vous n'avez pas acceptez")
        
      }
      }
      
      
  

  return (
    <div className='body'>
      <div className='infoPanier'>
        <table>
          <tbody>
        {GetArticlesInPanier.map((item, key) => (
          <div key={key}>
            <tr>
                <td>
          <img className='tdImage' src={item.photo} alt="" />
                </td>
                <td>
          {item.titre}
                </td>
            </tr>
                {/* <td>
                  {states.totale}
                </td> */}
          </div>
        ))}
              </tbody>
        </table>
      </div>
      <article className="cardCommand">
        <div className="containerCard">
          <div className="card-title">
            <h2>Payment</h2>
          </div>
          <div className="card-body">
            <div className="payment-type">
              <h4>Choisissez votre méthode de paiement</h4>
              <div className="types flexin justify-space-between">
                <div className="type selected">
                  <div className="logoCard">
                    <i><RiBankCardFill/></i>
                  </div>
                  <div className="text">
                    <p>Payer avec votre Carte</p>
                  </div>
                </div>
                <div className="type">
                  <div className="logoCard">
                    <i ><RiPaypalFill/></i>
                  </div>
                  <div className="text">
                    <p>Payer avec PayPal</p>
                  </div>
                </div>
                <div className="type">
                  <div className="logoCard">
                    <i></i>
                  </div>
                  <div className="text">
                    <p>///</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-info flexin justify-space-between">
              <div className="column billing">
                <div className="title">
                  <div className="num">1</div>
                  <h4>Vos infos </h4>
                </div>

                <div className='field full'>
                  {inputAdress.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className='field full'>
                  {inputName.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className="flexin justify-space-between">
                  <div className="field half">
                    {InputCity.map((input) => (
                      <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                  <div className="field half">
                    {InputVille.map((input) => (
                      <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                </div>
                <div className='field full'>
                  {inputZip.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
              </div>
              <div className="column shipping">
                <div className="title">
                  <div className="num">2</div>
                  <h4>Entrez les informations de votre carte</h4>
                </div>
                <div className='field full'>
                  {inputNameCard.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className='field full'>
                  {InputCardNumber.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className="flexin justify-space-between">
                  <div className='field half'>
                    {InputMonth.map((input) => (
                      <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                  <div className='field half'>
                    {InputYear.map((input) => (
                      <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                </div>
                <div className='field full'>
                  {InputCvc.map((input) => (
                    <InputCard className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions flexin justify-space-between">
            <div className="flex-start">
              <p onClick={()=> navigate("/home") } className="button button-secondary">Retourner sur le store</p>
            </div>
            <div className="flex-end">
              <div>
              <input type="checkbox" id="save" name="save" value={isSave} onChange={handleChange}/>
              <label for="save">Souhaitez-vous enregistrez vos données ?</label>
              </div>
              
              {/* <button className="button button-link">Back to Shipping</button> */}
              <button onClick={()=>callAPI()} className="button button-primary">Proceder au paiement</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
