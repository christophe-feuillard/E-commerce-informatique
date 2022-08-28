import './personalInfo.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tab } from '@headlessui/react'
import { useEffect } from "react";
import { GetGlobalData } from '../../../useContext/AuthProviders';
import { PaperClipIcon } from '@heroicons/react/solid'


const PersonalInfo = () => {

  const { contextTotal, contextUser } = GetGlobalData();
  const [total] = contextTotal;
  const [user] = contextUser;
  const navigate = useNavigate();
  const [modeCard, setModeCard] = useState('')


  // console.log(user, 'User connecté')


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
  // console.log( modeCard )
  useEffect(() => (

    setModeCard(carteBancaire)

  ), [])

  // console.log(modeCard, 'gfchgfhf')

  // console.log(modeCard)
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
  console.log(user)
  // console.log(user, 'User connecté')
  return (
    <div className="sizeNav">
      <div className="MonProfil">
        <p>Mon profil</p>
      </div>
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
            // {articles.stock ? }
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
                    {/* <div className="grid grid-cols-2" >
                                <div className="px-4 py-2 font-semibold">Adresse postale</div>
                                <div className="px-4 py-2">{user.adresse} {user.ville} {user.CodePostal}</div>
                            </div> */}
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
            {/* <div>
              <div>{user.orderDetails.map((orderInfo, key) =>(
                <div key={key}>{orderInfo.nom}</div>
              ))}</div>
            </div> */}
              {user.orderDetails.map((orderInfo, key) =>(
              <div className="bg-white text-gray-900 shadow overflow-hidden sm:rounded-lg mb-20">
                  
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Information </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Commande n°{orderInfo.numero_de_suivis}</p>
      </div>
      <div key={key} className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Prénom</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderInfo.prenom}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nom</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderInfo.nom}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Adresse email</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderInfo.email}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Adresse de livraison</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{orderInfo.adresse_de_livraison} {orderInfo.code_postale} {orderInfo.ville}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Numéro de suivi</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
           {orderInfo.numero_de_suivis}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Document</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <a href={orderInfo.DocTrack} className="ml-2 flex-1 w-0 truncate">{orderInfo.DocTrack}</a>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href={orderInfo.DocTrack} download className="font-medium text-indigo-600 hover:text-indigo-500">
                      Voire mon suivi
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
      ))}

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
                      {/* <img src="https://raw.githubusercontent.com/muhammederdem/credit-cardaster/src/assets/images/chip.png" alt='Smart card' className="w-12"/> */}

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
                {/* <div className="flex justify-center items-center text-gray-700 ">
        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  ">Supprimer ma carte</button>
        </div> */}
              </div>

            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default PersonalInfo;