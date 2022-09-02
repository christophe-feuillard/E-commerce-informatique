import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GetGlobalData } from '../../useContext/AuthProviders';

function PaymentConfirmation() {
    
    const {contextStore, contextPaypal} = GetGlobalData();
    const [setStore] = contextStore;
    const [paypal] = contextPaypal;
    const navigate = useNavigate();

console.log(paypal,'PAYPAL')
    
  return (
    <div>
   {/* {user.orderDetails.map((order, key) => (
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
                    <dt className="font-medium text-gray-900">Shipping address</dt>
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
                    <dt className="font-medium text-gray-900">Payment method</dt>
                    <dd className="mt-2 text-gray-700">
                      <p>Apple Pay</p>
                      <p>Mastercard</p>
                      <p>
                        <span aria-hidden="true">•••• </span>
                        <span className="sr-only">Ending in </span>1545
                      </p>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-900">Méthode de livraison</dt>
                    <dd className="mt-2 text-gray-700">
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
            ))} */}
        <div className='voirArticles'>
            <p onClick={()=>{
                // setStore([])
                navigate("/home")
                }} >
            Retour à l'accueil
            </p>
        </div>
    </div>
  )
}

export default PaymentConfirmation