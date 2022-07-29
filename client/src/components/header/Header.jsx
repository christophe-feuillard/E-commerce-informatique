import React, {useState} from 'react';
import './Header.css';
import Logo from "../logo/Logo";
import InputSearch from "../input/InputSearch";
import Button from '../button/Button';
import NavItems from '../navItem/NavItems';

const Header = ({search,change,storeClick,articleNumber,categorie,searchClick}) => {

  return (
    <div className='mainDiv'>
        <Logo/>

        <div className='search'>
            <InputSearch placeholder={"Entrez votre recherche ici"} type={"text"} value={search} change={change}/>
            <Button value={"chercher"} handelclick={searchClick}/>

        </div>
        <NavItems storeClick={storeClick} number={articleNumber}/>

    </div>
  )
}

export default Header;