import './Header.css';
import Logo from "../logo/Logo";
import Input from "../input/Input";
import Button from '../button/Button';

const Header = ({register,login}) => {

  return (
    <div className='mainDiv'>
        <Logo />

        <div className='search'>
            <Input placeholder={"Etrez votre recherche ici"}/>
            <Button value={"chercher"}/>
        </div>

        <div className='login'>
          <h3 onClick={register}>Inscription</h3>
          <h3 onClick={login}> Connexion</h3>
        </div>

    </div>
  )
}

export default Header;