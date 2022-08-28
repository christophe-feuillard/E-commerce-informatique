import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GetGlobalData } from '../../useContext/AuthProviders';

function PaymentConfirmation() {
    
    const {contextStore} = GetGlobalData();
    const [setStore] = contextStore;
    const navigate = useNavigate();


  return (
    <div>
      <div className='mx-auto text-center text-6xl text-gray-900 w-2/3'>
        <span>Votre Paiement à bien été éffectuer</span>
      </div>
        <div className='voirArticles'>
            <p onClick={()=>{
                setStore([])
                navigate("/home")
                }} >
            Retour à l'accueil
            </p>
        </div>
    </div>
  )
}

export default PaymentConfirmation