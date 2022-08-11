import React, { useState } from 'react'
import { RiBankCardFill} from 'react-icons/ri';
import InputCard from '../../components/input/InputCard';
import './commande.css'
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GetGlobalData } from '../../useContext/AuthProviders';

export const Commande = () => {
  

const {contextStore, contextTotal, contextUser} = GetGlobalData();
const [store] = contextStore;
const [total] = contextTotal;
const [user] = contextUser;
   
console.log(user.name)
const token = localStorage.getItem("token");

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
  const [orderId, setOrderId] = useState(false);
  const  [errorMessage, setErrorMessage] = useState("");
  const [isSave, setIsSave] = useState(false);

  const navigate = useNavigate()

  console.log(orderId);
  console.log(errorMessage);

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
      type: 'text', id: 'nameCard', for: 'nameCard', placeholder: 'name card', value: user.card.name, change: (e) => setCardName(e.target.value)
    }
  ]

  const InputCvc = [

    {
      type: 'text', id: 'cvc', for: 'cvc', placeholder: 'cvc', value: cardCvc, change: (e) => setCvc(e.target.value)
    }
  ]
  const InputCardNumber = [

    {
      type: 'text', id: 'number', for: 'number', placeholder: 'number', value: user.card.number, change: (e) => setCardNumber(e.target.value)
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

 const product = {
   amount : total
 }

  const handleChange = event => {
    if (event.target.checked) {
      console.log('Checkbox is checked');
      console.log(name)
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
      url: 'http://127.0.0.1:8000/api/payment',
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
    <div className='body mt-7'>
    <div >
   <div className="flow-root scrollY max-h-96">
              <ul className="-my-6 divide-y divide-gray-200">
                {store.map((product, key) => (
                  <li key={key} className="py-6 flex space-x-6">
                    <img
                      src={product.photo}
                      alt='produit'
                      className="flex-none w-24 h-24 object-center object-cover bg-gray-100 rounded-md"
                    />
                    <div className="flex-auto">
                      <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                        <div className="flex-auto text-sm font-medium space-y-1">
                          <div className="text-gray-900">
                            <p>{product.titre}</p>
                          </div>
                          <p className="text-gray-900">{product.prix + "€"}</p>
                         
                          <p className="hidden text-gray-500 sm:block">{product.quantity}</p>
                        </div>
                        <div className="flex-none flex space-x-4">
                          <button type="button" className="text-sm font-medium  hover:text-indigo-500">
                            Edit
                          </button>
                          <div className="flex border-l border-gray-300 pl-4">
                            <button type="button" className="text-sm font-medium  hover:text-indigo-500">
                                Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6 pr-5">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">$104.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">$8.32</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">$14.00</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">{total}</dd>
              </div>
            </dl>
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
                
                {/* Paypal */}
                <div className="type">
                  <div className="text">
                      <p>Payer plus vite</p>
                  </div>
                  <div className="logoCard">
                    
                          <PayPalButtons style={{ layout: "horizontal",color: "blue", label: "pay"}} 
                            createOrder={async (data, actions) => {
                              const orderID = await actions.order
                                .create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: product.amount
                                      },
                                    },
                                  ],
                                });
                              setOrderId(orderID);
                              return orderID;
                            }}
                            onApprove={async (data, actions) => {
                              const details = await actions.order.capture();
                              const { payer } = details;
                              navigate("/payment_confirmation");
                            }}
                            onError={(data, actions) => {
                              setErrorMessage("An Error occured with your payment ");
                            }}
                          />
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
                  {inputAdress.map((input, key) => (
                    <InputCard key={key} className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className='field full'>
                  {inputName.map((input, key) => (
                    <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className="flexin justify-space-between">
                  <div className="field half">
                    {InputCity.map((input, key) => (
                      <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                  <div className="field half">
                    {InputVille.map((input, key) => (
                      <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                </div>
                <div className='field full'>
                  {inputZip.map((input, key) => (
                    <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
              </div>
              <div className="column shipping">
                <div className="title">
                  <div className="num">2</div>
                  <h4>Entrez les informations de votre carte</h4>
                </div>
                <div className='field full'>
                  {inputNameCard.map((input, key) => (
                    <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className='field full'>
                  {InputCardNumber.map((input, key) => (
                    <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                </div>
                <div className="flexin justify-space-between">
                  <div className='field half'>
                    {InputMonth.map((input, key) => (
                      <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                  <div className='field half'>
                    {InputYear.map((input, key) => (
                      <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                    ))}
                  </div>
                </div>
                <div className='field full'>
                  {InputCvc.map((input, key) => (
                    <InputCard key={key}  className='input' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
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
              <label htmlFor="save">Souhaitez-vous enregistrez vos données ?</label>
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
