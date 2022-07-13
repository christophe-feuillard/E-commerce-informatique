import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Landing.css';
import Logo from "../../components/logo/Logo";
import BackgroundVideo from "../../asset/video.mp4";
import ComputerImage from "../../asset/ordi.png";
import Button from "../../components/button/Button";

const Landing = () => {

  const navigate = useNavigate();

  return (
    <>
      <Logo/>

      <div className='videoContainer'>
        <video autoPlay loop muted playsInline src={BackgroundVideo} />
      </div>
      
      <div className='content'>
        <div className='text'>
          <h3>Les meilleurs composants pour les meilleurs performances chez <br/><span>Seteup Dream</span> </h3>
          <Button value='Commencer' handleckick={()=> navigate("/home")}/>
        </div>
        <img src={ComputerImage} alt="Computer"/>
      </div>

    </>
  )
}

export default Landing;