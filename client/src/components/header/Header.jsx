import './Header.css';
import Logo from "../logo/Logo";
import Input from "../input/Input";
import Button from '../button/Button';
import NavItems from '../navItem/NavItems';

const Header = () => {

  return (
    <div className='mainDiv'>
        <Logo />

        <div className='search'>
            <Input placeholder={"Etrez votre recherche ici"}/>
            <Button value={"chercher"}/>
        </div>
        <NavItems/>

    </div>
  )
}

export default Header;