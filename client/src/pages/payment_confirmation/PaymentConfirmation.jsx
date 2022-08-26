import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GetGlobalData } from '../../useContext/AuthProviders';

function PaymentConfirmation() {
    
    const {contextStore} = GetGlobalData();
    const [setStore] = contextStore;
    const navigate = useNavigate();


  return (
    <div>
        <span>Paiement confirmé</span>
        <div className='voirArticles'>
            <p  onClick={()=>{
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