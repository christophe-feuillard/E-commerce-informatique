import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from './pages/account/Account';
import DataFDP from './FDP/dataFDP';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Landing/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/fdp' element={<DataFDP/>}/>
    </Routes>
  );
}

export default App;
