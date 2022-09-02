import React from 'react';
import './Header.css';
import Logo from "../logo/Logo";
import InputSearch from "../input/InputSearch";
import NavItems from '../navItem/NavItems';

const Header = ({search,change,storeClick,articleNumber, data}) => {

  return (
    <div className='mainDiv'>
        <Logo/>

        <div className='search'>
            <InputSearch placeholder={"Entrez votre recherche ici"} type={"text"} value={search} change={change} search={search} data={data}/>
        </div>
        <NavItems storeClick={storeClick} number={articleNumber}/>

    </div>
  )
}

export default Header;