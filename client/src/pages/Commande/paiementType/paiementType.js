import React, { useState } from 'react'
import { RiBankCardFill, RiPaypalFill } from 'react-icons/ri';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { GetGlobalData } from '../../../useContext/AuthProviders';
import '../commande.css'

export const PaiementType = () => {
    const [orderId, setOrderId] = useState(false);
    const  [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate()
    
    const {contextTotal} = GetGlobalData();
    const [total] = contextTotal;
    const product = {
        amount : total
      }


  return (
    <div>
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





    </div>
  )
}
