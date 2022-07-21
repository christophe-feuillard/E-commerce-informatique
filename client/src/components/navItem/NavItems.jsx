import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import './NavItems.css';

const NavItems = ({storeClick}) => {
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    
    useEffect(() => {
        const Token = localStorage.getItem("token");
        if(Token) setIsLogged(true);
    },[]);

    const Deconnexion = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    if(isLogged === true){
        return(
            <div className='login'>
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={storeClick} />
            <div class="dropdown">
                <AiOutlineUser className='iconNavItems'/>
                <div class="dropdown-content">
                    <a onClick={()=> navigate("/")}>Mon Compte</a>
                    <a onClick={()=>Deconnexion()}>Deconnexion</a>
                </div>
            </div>
            </div>
        )
    }
    else{
        return(
            <div className='login'>
            <h3 onClick={()=>navigate('/register')}>Inscription</h3>
            <h3 onClick={()=>navigate('/login')}>Connexion</h3>
        </div>
        )
    }
}

export default NavItems;