import './personalInfo.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tab } from '@headlessui/react'
import { useEffect } from "react";
import { GetGlobalData } from '../../../useContext/AuthProviders';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



const PersonalInfo = () => {

  const { contextTotal, contextUser } = GetGlobalData();
  const [total] = contextTotal;
  const [user] = contextUser;
  const navigate = useNavigate();
  const [modeCard, setModeCard] = useState('')

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const firstNumber = [{
    number: 4,
    card: 'Visa',
    url: '/visa.png'
  },
  {
    number: 5,
    card: 'Mastercard',
    url: '/master.png'
  },
  {
    number: 6,
    card: 'Discover',
    url: '/master.png'
  }]



  const carteBancaire = firstNumber.filter((item) => {
    if (user?.card?.number.charAt(0) == item.number) {
      return item
    }

  })

  useEffect(() => (

    setModeCard(carteBancaire)

  ), [])

  const date = user.adresse + ' ' + user.ville + ' ' + user.CodePostal

  const titre = [{
    title: 'Mes Informations'
  },
  {
    title: 'Mes commandes'
  },
  {
    title: 'Mes méthodes de paiement'
  }]

  const info = [
    {
      titre: "Prénom",
      ref: user.Firstname
    },
    {
      titre: "Nom",
      ref: user.name
    },
    {
      titre: "Adresse email",
      ref: user.email
    },
    {
      titre: "Date de naissance",
      ref: user.birthdate
    },
    {
      titre: "Numéro de téléphone",
      ref: user.phone
    }
    ,
    {
      titre: "Adresse postale",
      ref: date
    }
  ]
  
  return (
    <div className="sizeNav">
      <div className="MonProfil">
        <p>Mon profil</p>
      </div>
      <Breadcrumbs className='text-gray-900' separator={'//'} maxItems={2} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/home">
    Home
  </Link>
  <Link underline="hover" color="red" href="/personal_info">
    Vos informations
  </Link>

</Breadcrumbs>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {titre.map((category, key) => (
            <Tab
              key={key}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-stone-900',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >

            <div className="bg-white p-3 shadow-sm rounded-sm">

              {info.map((item, index) => (
                <div key={index} className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">{item.titre}</div>
                      <div className="px-4 py-2">{item.ref}</div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >
        {user.orderDetails.map((order, key) => (
        <div className="bg-white mt-16">
          <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-xl mb-10">
              <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Merci !</h1>
              <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">It's on the way!</p>
              <p className="mt-2 text-base text-gray-500">Votre livraison #{order.numero_de_suivis} à été commander, vous allez la recevoir sous quelques jours.</p>
    
              <dl className="mt-12 text-sm font-medium">
                <dt className="text-gray-900">Numéro de suivis</dt>
                <dd className="text-indigo-600 mt-2">{order.numero_de_suivis}</dd>
              </dl>
            </div>
                  <a href={order.DocTrack} className=" p-3 text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Tracker votre commande </a>
                   
            <div className="mt-10 border-t border-gray-200">
              <h2 className="sr-only">Your order</h2>

              <h3 className="sr-only">Articles</h3>
              {order.orderItems.map((infoItem, key) => (
                <div>
                    <div key={key} className="py-10 border-b border-gray-200 flex space-x-6">
                  <img
                    src={infoItem.product.photo}
                    alt='articles image'
                    className="flex-none w-20 h-20 object-center object-cover bg-gray-100 rounded-lg sm:w-40 sm:h-40"
                    />
                  <div className="flex-auto flex flex-col">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        <a href={'r'}>{}</a>
                      </h4>
                      <p className="mt-2 text-sm text-gray-600">{infoItem.product.titre}</p>
                    </div>
                    <div className="mt-6 flex-1 flex items-end">
                      <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                        <div className="flex">
                          <dt className="font-medium text-gray-900">Quantité</dt>
                          <dd className="ml-2 text-gray-700">{infoItem.quantity}</dd>
                        </div>
                        <div className="pl-4 flex sm:pl-6">
                          <dt className="font-medium text-gray-900">Prix</dt>
                          <dd className="ml-2 text-gray-700">{infoItem.product.prix}€</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
            
                
                    </div>
              ))}
              <div className="sm:ml-40 sm:pl-6">
                <h3 className="sr-only">Your information</h3>
    
                <h4 className="sr-only">Addresse</h4>
                <dl className="grid grid-cols-2 gap-x-6 text-sm py-10">
                  <div>
                    <dt className="font-medium text-gray-900">Adresse de livraison</dt>
                    <dd className="mt-2 text-gray-700">
                      <address className="not-italic">
                        <span className="block">{order.prenom} {order.nom}</span>
                        <span className="block">{order.adresse_de_livraison}</span>
                        <span className="block">{order.ville}, {order.code_postale}</span>
                      </address>
                    </dd>
                  </div>
                </dl>
    
                <h4 className="sr-only">Payment</h4>
                  <div>

                  <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 text-sm py-10">
                  <div>
                    <dt className="font-medium text-gray-900">Méthode de paiement</dt>
                    <dd className="mt-2 text-gray-700">
                      <p>Carte bancaire</p>
                      <p>{ user?.card?.number?.charAt(0) == 4 ? 'Visa': 'Mastercard'}</p>
                      <p>
                        <span aria-hidden="true">••••</span>
                        <span className="sr-only">Ending in </span>{user.card?.number?.substring(1, 5)}
                      </p>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Méthode de livraison</dt>
                    <dd className="mt-2 text-gray-700">
                      Service:
                      <p>{order.service}</p>
                    </dd>
                  </div>
                </dl>
                
    
                <h3 className="sr-only">Récapitulatif</h3>
    
                <dl className="space-y-6 border-t border-gray-200 text-sm pt-10">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Sous-total</dt>
                    <dd className="text-gray-700">{order.total}€</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Frais de port</dt>
                    <dd className="text-gray-700">{order.frais}€</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-900">Total</dt>
                    <dd className="text-gray-900">{Number(order.total) + Number(order.frais)}€</dd>
                  </div>
                </dl>
                  </div>
                  
              </div>
            </div>
            </div>
            </div>
            ))}
      )
    

          </Tab.Panel>
          <Tab.Panel
          className={classNames(
            'rounded-xl p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >
            <div className="flexCard">
              <div>
                <div id="card" className="relative w-96 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500">
                  <div id='cardRotate' className="absolute top-0 left-0 w-full h-full flex flex-col justify-center gap-6 p-6 bg-gradient-to-tr from-gray-900 to-gray-700 transition-all duration-100 delay-200 z-20">

                    <div className="flex justify-between items-center">

                      <img src={modeCard[0]?.url} alt="Visa image" className="w-12" />
                    </div>


                    <div className="">
                      <label className="hidden">Numéro de carte</label>
                      <input type="text" id="" value={user?.card?.number} readOnly
                        className="outline-none w-full bg-transparent text-center text-2xl" />
                    </div>

                    <div className="w-full flex flex-row justify-between">

                      <div className="w-full flex flex-col">
                        <label>Nom</label>
                        <input type="text" id="" value={user?.card?.firstname + ' ' + user?.card?.name} readOnly
                          className="outline-none bg-transparent" />
                      </div>

                      <div className="w-1/4 flex flex-col">
                        <label>Exp</label>
                        <input type="text" id="" value={user?.card?.date} readOnly className="outline-none bg-transparent" />
                      </div>

                    </div>

                  </div>

                  <div id='backContent' className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center bg-gradient-to-tr from-gray-900 to-gray-700 transition-all z-10"
                  >

                    <div className="w-full h-12 bg-black"></div>

                    <div className="px-6 flex flex-col gap-6 justify-center">
                      <div className="flex flex-col items-end">
                        <label>cvv</label>
                        <input type="text" id="inputcvv" value={user?.card?.cvc} readOnly
                          className="outline-none rounded text-black w-full h-8 text-right"
                        />
                      </div>



                    </div>

                  </div>
                </div>
              </div>

            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default PersonalInfo;