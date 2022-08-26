import { useEffect, useState } from 'react'
import {RadioGroup} from '@headlessui/react'
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid'
import InputCard from '../../components/input/InputCard';
import { PayPalButtons } from "@paypal/react-paypal-js";


import { GetGlobalData } from '../../useContext/AuthProviders';
import { Trash } from '../../components/panier/trash';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

  const deliveryMethods = [
    { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
    { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
  ]
  const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
   ,
  ]
export const Commande = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])

  const {contextStore, contextTotal,contextUser} = GetGlobalData();
  const [store, setStore] = contextStore;
  const [total] = contextTotal;
  const [user] = contextUser

  
  
  const product = {
    amount : total
  }
  
  
  
  const [orderId, setOrderId] = useState(false);
  const  [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cardCvc, setCvc] = useState('');
  const [rate, setRate] = useState([]);
  const [frais, setFdp] = useState(0);
  const [quantite, setQuantite] = useState(1)
  const [isSave, setIsSave] = useState(false);
  
  const navigate = useNavigate()

  
  // console.log(user)
  const inputName = [
    {
  
      type: 'text', id: 'name', for: 'Prénom', value: name, change: (e) => setName(e.target.value)
  
    },
  ]
  const inputEmail = [
    {
  
      type: 'text', id: 'name', for: 'Email', value: email, change: (e) => setEmail(e.target.value)
  
    },
  ]
  const inputFName = [
    {
  
      type: 'text', id: 'name', for: 'name', value: firstname, change: (e) => setFirstname(e.target.value)
  
    },
  ]
  
  const inputAdress = [
    {
  
      type: 'text', id: 'adress', for: 'adress', value: adress, change: (e) => setAdress(e.target.value)
  
    }
  ]

  const inputPhone = [
    {
  
      type: 'text', id: 'adress', for: 'adress',value: phone, change: (e) => setPhone(e.target.value)
  
    }
  ]
  
  const inputZip = [
    {
      type: 'text', id: 'zip', for: 'zip',value: zip, change: (e) => setZip(e.target.value)
    },
  ]
  
  const inputNameCard = [
    {
      type: 'text', id: 'nameCard', for: 'nameCard',value: user?.card?.name , change: (e) => setCardName(e.target.value)
        }
  ]
  
  const InputCvc = [
    {
      type: 'text', id: 'cvc', for: 'cvc',value: cardCvc, change: (e) => setCvc(e.target.value)
    }
  ]
  const InputCardNumber = [
    {
      type: 'text', id: 'number', for: 'number',value: user?.card?.number, change: (e) => setCardNumber(e.target.value)
    }
  ]
  
  const InputCity = [
    {
      type: 'text', id: 'city', for: 'city',value: city, change: (e) => setCity(e.target.value)
    },
  ]
  const InputCountry = [
    {
      type: 'text', id: 'Pays', for: 'Pays',value: country, change: (e) => setCountry(e.target.value)
    },
  
  ]
  const InputMonth = [
    {
      type: 'text', id: 'month', for: 'month', value: month, change: (e) => setMonth(e.target.value)
    },
  ]
  const InputYear = [
    {
      type: 'text', id: 'year', for: 'year', value: year, change: (e) => setYear(e.target.value)
    }
  ]
  


  const callAPI = () => { 
    var data = JSON.stringify({
      "name": firstname,
      "adresse": adress,
      "numero": phone,
      "pays": country,
      "zip": zip,
      "panier": JSON.stringify(store)
  });
console.log(store, 'STOREE')
console.log(data, 'DATA')
  var config = {
    method: 'POST',
    url: 'http://localhost:8000/api/FDP',
    headers: { 
      'Content-Type': 'application/json',
    },
    data : data
  };
     axios(config)
    .then(res => {
        console.log(res);
        setRate(res.data[0].rates)
    })
    .catch(err => {
    console.log(err);
    }); 
  }
// console.log(rate)
// console.log(orderID)
  return (
    <div className="bg-gray-50 text-gray-900">    
 
      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>



          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact</h2>

                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                   Adresse Email
                  </label>
                  <div className="mt-1">
                  {inputEmail.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h4 className='text-lg font-medium text-red-900 '>Nous livrons seulement aux Us !</h4>
                <h2 className="text-lg font-medium text-gray-900">Information sur la livraison</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <div className="mt-1">
                    {inputFName.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                    {inputName.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Addresse de livraison 
                    </label>
                    <div className="mt-1">
                    {inputAdress.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <div className="mt-1">
                    {InputCity.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Pays
                    </label>
                    <div className="mt-1">
                    {InputCountry.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                    {inputZip.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Code postal
                    </label>
                    <div className="mt-1">
                    {inputZip.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Numéro de téléphone
                    </label>
                    <div className="mt-1">
                    {inputPhone.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">Méthode de livraison</RadioGroup.Label>
                  <button
                  type="button"
                  onClick={callAPI}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Calculer vos frais de port
                  </button>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {rate.map((MethodeLivraison, key) => (
                      <RadioGroup.Option
                        key={key}
                        value={MethodeLivraison.id}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex-1 flex">
                              <div className="flex flex-col">
                                <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                {MethodeLivraison.service}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                               {MethodeLivraison.delivery_days} Jours
                                </RadioGroup.Description>
                                <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                {MethodeLivraison.rate}€
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                               setFdp(MethodeLivraison.rate)
                            ) : null}
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'absolute -inset-px rounded-lg pointer-events-none'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                     ))}
                  </div>
                </RadioGroup>
              </div>

            
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Paiement</h2>
           
           
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
                              navigate("/payment_confirmation" );
                            }}
                            onError={(data, actions) => {
                              setErrorMessage("An Error occured with your payment ");
                            }}
          />

     <div className='m-auto w-64'> <p className='text-center'> ou </p></div>
                <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Numéro de carte
                    </label>
                    <div className="mt-1">
                    {InputCardNumber.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                      Nom 
                    </label>
                    <div className="mt-1">
                    {inputNameCard.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>
                  <div>
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Mois
                    </label>
                    <div className="mt-1">
                    {InputMonth.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>

                  <div>
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Année
                    </label>
                    <div className="mt-1">
                    {InputYear.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>


                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                    {InputCvc.map((input, key) => (
                    <InputCard key={key} className='input appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white' type={input.type} value={input.value} placeholder={input.placeholder} change={input.change} />
                  ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Récapitulatif commande</h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Articles dans ton panier</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {store.map((product) => (
                    <li key={product.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={product.photo} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {product.titre}
                              </p>
                            </h4>
                           
                            <p className="mt-1 text-sm text-gray-500">{product.weight+ 'kg' + '  ' + product.height+ 'cm'+ '  ' + product.lenght+ 'cm' + '  ' + product.width+ '"'}</p>
                          </div>
                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Supprimer</span>
                              <TrashIcon onClick={() => Trash(product.id, setStore, store)} className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">{ product.prix * product.quantity} €</p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantité
                            </label>
                            <p className='font-medium text-gray-900'>{product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='m-auto w-64'>

               

                  </div>
                    <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Sous Totale</dt>
                    <dd className="text-sm font-medium text-gray-900">64.00€</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Frais de port</dt>
                    <dd className="text-sm font-medium text-gray-900">{frais}€</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">{ Number(total) +  Number(frais)+ '€'}</dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                  type="button"
                    onClick={callAPI}
                    className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Confirmer la commande
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}