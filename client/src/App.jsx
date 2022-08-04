import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from './pages/account/Account';
import Frais from "./components/fdp/frais"
import Favoris from './pages/favoris/Favoris';
import ArticleDetails from "./pages/article_details/Article_details";
import { Commande } from './pages/Commande/Commande';
import { AuthProviders } from './useContext/AuthProviders';
import Panier from './components/panier/Panier';
import PersonalInfo from './admin/components/PersonalInfo/PersonalInfo';
import { PaymentMethode } from './admin/components/PersonalInfo/Link/paymentMethode';
import { MyInfo } from './admin/components/PersonalInfo/Link/myInfo';

function App() {
  return (
    <AuthProviders>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Landing/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/profil' element={<PersonalInfo/>}/>
      <Route path='/favoris' element={<Favoris/>}/>
      <Route path='/frais' element={<Frais/>}/>
      <Route path='/commande' element={<Commande/>}/>
      <Route path='/payment' element={<PaymentMethode/>}/>
      <Route path='/info' element={<MyInfo/>}/>
      <Route path='/panier' element={<Panier/>}/>
      <Route path="/article_details" element={<ArticleDetails/>}/>
      <Route path="/article_details/:articlesParams" element={<ArticleDetails srcImage=""/>}/>
    </Routes>
    </AuthProviders>
  );
}

export default App;
