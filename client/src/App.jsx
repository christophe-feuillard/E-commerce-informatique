import React from 'react';
import { Routes, Route} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="*" element={<Landing/>}/>
    </Routes>
  );
}

export default App;
