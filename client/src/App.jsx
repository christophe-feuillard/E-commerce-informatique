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
import InvoiceData from './components/fdp/invoiceData';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Landing/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/favoris' element={<Favoris/>}/>
      <Route path='/frais' element={<Frais/>}/>
      <Route path='/invoice' element={<InvoiceData/>}/>
      <Route path='/commande' element={<Commande/>}/>
      <Route path="/article_details" element={<ArticleDetails/>}/>
      <Route path="/article_details/:articlesParams" element={<ArticleDetails srcImage=""/>}/>
    </Routes>
  );
}

export default App;
