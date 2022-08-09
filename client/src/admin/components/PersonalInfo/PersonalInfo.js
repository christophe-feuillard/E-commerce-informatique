import './personalInfo.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tab } from '@headlessui/react'
import { useEffect } from "react";
import { GetGlobalData } from '../../../useContext/AuthProviders';


const PersonalInfo = () => {

  const {contextStore, contextTotal,contextUser} = GetGlobalData();
  const [store, setStore] = contextStore;
  const [total] = contextTotal;
  const [user] = contextUser;
  const navigate = useNavigate();
  const [modeCard, setModeCard] = useState('')


  console.log(user, 'User connecté')  


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
    if (user.card.number.charAt(0) == item.number) {
      return item
    }

  })
// console.log( modeCard )
  useEffect(() => (

    setModeCard(carteBancaire)

  ), [])

  // console.log(modeCard, 'gfchgfhf')

  // console.log(modeCard)

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
      titre: "PRENOM",
      ref: user.name
    },
    {
      titre: "ADRESSE EMAIL",
      ref: user.email
    },
    {
      titre: "NUMERO DE TELEPHONE",
      ref: user.phone
    }
  ]
  console.log(user, 'User connecté')
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
            className={classNames(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >
            {info.map((item, index) => (

              <div key={index} className="mt-1 flex space-x-1 text-xs  font-normal leading-4 text-gray-500">
                <p>{item.titre} : </p>
                <p className="capitalize">{item.ref}</p>
              </div>
            ))}
            <div className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
              <p>ADRESSE : </p>
              <p className="capitalize">{user.adresse} {user.ville} {user.CodePostal}</p>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >
            <ul>
              <li>Aucune commande</li>
            </ul>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl p-3',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  '
            )}
          >
            <div className="flexCard hover:bg-white/[0.12]">

              <img className="s" src={modeCard[0]?.url} alt="" />
              <ul>
                <li className="i">
                  <div >
                    <ul>
                      <li>{modeCard[0]?.card} ({user.card.number.substring(0, 4)})</li>
                      <li>Exp: {user.card.date}</li>
                      <li>{user.card.name}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default PersonalInfo;