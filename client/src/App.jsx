import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from './pages/account/Account';
import Categories from './pages/categories/Categories';
import Frais from "./components/fdp/frais"
import ArticleDetails from "./pages/article_details/Article_details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Landing/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/categories/:id' element={<Categories/>}/>
      <Route path='/frais' element={<Frais/>}/>
      <Route path="/article_details" element={<ArticleDetails/>}/>
      <Route path="/article_details/:articlesParams" element={<ArticleDetails srcImage=""/>}/>
    </Routes>
  );
}

export default App;
