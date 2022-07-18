import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Categorie from "./pages/categories/Categorie";
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/categorie" element={<Categorie/>}/>
      <Route path="*" element={<Landing/>}/>
    </Routes>
  );
}

export default App;
