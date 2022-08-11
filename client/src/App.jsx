import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from './pages/account/Account';
import Categories from './pages/categories/Categories';
import Frais from "./components/fdp/frais"
import Favoris from './pages/favoris/Favoris';
import ArticleDetails from "./pages/article_details/Article_details";
import { Commande } from './pages/Commande/Commande';
import { AuthProviders } from './useContext/AuthProviders';
import Panier from './components/panier/Panier';
import { PaymentMethode } from './admin/components/PersonalInfo/Link/paymentMethode';
import { MyInfo } from './admin/components/PersonalInfo/Link/myInfo';
import ModalSmall from './components/modalSmall/ModalSmall';
import PaymentConfirmation from './pages/payment_confirmation/PaymentConfirmation';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{"client-id": "AYnNt36sxMGoExbhgbXaaVTz1QYCdi16TOedUbCRJxO4WDKsoitKKiQWBBFhcNBNWb5HnNTCcnV-r8C4"}}>
    <AuthProviders>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Landing/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/categories/:id' element={<Categories/>}/>
      <Route path='/favoris' element={<Favoris/>}/>
      <Route path='/frais' element={<Frais/>}/>
      <Route path='/commande' element={<Commande/>}/>
      <Route path='/payment' element={<PaymentMethode/>}/>
      <Route path='/modal' element={<ModalSmall/>}/>
      <Route path='/info' element={<MyInfo/>}/>
      <Route path='/panier' element={<Panier/>}/>
      <Route path="/article_details" element={<ArticleDetails/>}/>
      <Route path="/article_details/:articlesParams" element={<ArticleDetails srcImage=""/>}/>
      <Route path='/payment_confirmation' element={<PaymentConfirmation/>}/>
    </Routes>
    </AuthProviders>
    </PayPalScriptProvider>
  );
}

export default App;
