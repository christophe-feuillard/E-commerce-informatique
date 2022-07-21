import './Header.css';
import Logo from "../logo/Logo";
import Input from "../input/Input";
import Button from '../button/Button';
import NavItems from '../navItem/NavItems';

const Header = ({search,change,storeClick}) => {

  return (
    <div className='mainDiv'>
        <Logo/>

        <div className='search'>
            <Input placeholder={"Etrez votre recherche ici"} type={"text"} value={search} change={change}/>
            <Button value={"chercher"}/>
        </div>
        <NavItems storeClick={storeClick}/>

    </div>
  )
}

export default Header;