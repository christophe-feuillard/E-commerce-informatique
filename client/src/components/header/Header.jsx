import './Header.css';
import Logo from "../logo/Logo";
import Input from "../input/Input";
import Button from '../button/Button';

const Header = () => {

  return (
    <div className='mainDiv'>
        <Logo />

        <div className='search'>
            <Input placeholder={"Etrez votre recherche ici"}/>
            <Button value={"chercher"}/>
        </div>

        <div className='login'>
          <h3>Inscription</h3>
          <h3> Connexion</h3>
        </div>

    </div>
  )
}

export default Header;