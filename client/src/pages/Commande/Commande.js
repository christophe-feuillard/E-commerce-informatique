import React, { useEffect, useState } from 'react'
import { RiBankCardFill, RiPaypalFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import InputCard from '../../components/input/InputCard';
import './commande.css'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";




export const Commande = () => {

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
  const [orderID, setOrderID] = useState(false);
  const [success, setSuccess] = useState(false);
 const  [ErrorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()
  const states = useLocation();
  console.log(states)
  console.log(states.total, 'TOTALE')

  
  const GetArticlesInPanier =  JSON.parse(localStorage.getItem('store'))


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
      type: 'number', id: 'zip', for: 'zip', placeholder: 'zip', value: zip, change: (e) => setZip(e.target.value)
    },
  ]

  const inputNameCard = [

    {
      type: 'text', id: 'nameCard', for: 'nameCard', placeholder: 'name card', value: cardName, change: (e) => setCardName(e.target.value)
    }
  ]

  const InputCvc = [

    {
      type: 'number', id: 'cvc', for: 'cvc', placeholder: 'cvc', value: cardCvc, change: (e) => setCvc(e.target.value)
    }
  ]
  const InputCardNumber = [

    {
      type: 'number', id: 'number', for: 'number', placeholder: 'number', value: cardNumber, change: (e) => setCardNumber(e.target.value)
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
      type: 'number', id: 'month', for: 'month', placeholder: 'month', value: month, change: (e) => setMonth(e.target.value)
    },
  ]
  const InputYear = [
    {
      type: 'number', id: 'year', for: 'year', placeholder: 'year', value: year, change: (e) => setYear(e.target.value)
    }
  ]

  const initialOptions = {
    "client-id": "AYyffC2_n1tabYrTG_TtICCkqinchuyrhIm076HuTJjQ6-jDId6WjnD0uC4DkeDwWizSNDrrxa3Ebh7t",
    // currency: "EUR",
    // "data-client-token": "abc123xyz==",
  };

  const amount = "1209";
  const currency = "USD";

  return (
    <div className='body'>
      <div className='infoPanier'>
        <table>
          <tbody>
        {GetArticlesInPanier.map((item) => (
          <div>
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
              <div className="types flex justify-space-between">
                <div className="type selected">
                  <div className="logoCard">
                    <i><RiBankCardFill/></i>
                  </div>
                  <div className="text">
                    <p>Payer avec votre Carte</p>
                  </div>
                </div>
                
                {/* Paypal */}
                <div className="type">
                  <div className="text">
                      <p>Payer plus vite</p>
                  </div>
                  <div className="logoCard">
                    <PayPalScriptProvider options={initialOptions}>
                          <PayPalButtons style={{ layout: "horizontal",color: "blue", label: "pay"}} 
                            createOrder={async (data, actions) => {
                              const orderId = await actions.order
                                .create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        currency_code: currency,
                                        value: amount,
                                      },
                                    },
                                  ],
                                });
                              setOrderID(orderID);
                              return orderId;
                            }}
                            onApprove={async (data, actions) => {
                              const details = await actions.order.capture();
                              const { payer } = details;
                              setSuccess(true);
                              navigate("/home");
                              alert("La commande a bien été réglée par " + details.payer.name.given_name);
                            }}
                            onError={(data, actions) => {
                              setErrorMessage("An Error occured with your payment ");
                            }}
                          />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-info flex justify-space-between">
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
                <div className="flex justify-space-between">
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
                <div className="flex justify-space-between">
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

          <div className="card-actions flex justify-space-between">
            <div className="flex-start">
              <p onClick={()=> navigate("/home") } className="button button-secondary">Retourner sur le store</p>
            </div>
            <div className="flex-end">
              {/* <button className="button button-link">Back to Shipping</button> */}
              <button className="button button-primary">Proceder au paiement</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
