import React, {useState} from 'react';
import './Header.css';
import Logo from "../logo/Logo";
import Input from "../input/Input";
import Button from '../button/Button';
import NavItems from '../navItem/NavItems';

const Header = ({search,change,storeClick,articleNumber,categorie,searchClick}) => {

  return (
    <div className='mainDiv'>
        <Logo/>

        <div className='search'>
            <Input placeholder={"Entrez votre recherche ici"} type={"text"} value={search} change={change}/>
            <Button value={"chercher"} handelclick={searchClick}/>
            {/* <select name="pets" id="pet-select" onChange={(e)=>{categorie(parseInt(e.target.value))}}>
              <option value="">Selectionnez une catégorie</option>
              <option value="3">Ordinateur Portabl</option>
              <option value="4">Carte Graphique</option>
            </select> */}
        </div>
        <NavItems storeClick={storeClick} number={articleNumber}/>

    </div>
  )
}

export default Header;