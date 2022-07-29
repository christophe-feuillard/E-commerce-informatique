import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineLocalGroceryStore,MdOutlineFavorite} from "react-icons/md";

import './NavItems.css';

const NavItems = ({storeClick,number,  }) => {
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
            <div className='login1'>
            <div className="dropdown">
                <AiOutlineUser className='iconNavItems'/>
                <div className="dropdown-content">
                    <a onClick={()=> navigate("/account")}>Mon Compte</a>
                    <a onClick={()=>Deconnexion()}>Deconnexion</a>
                </div>
                <MdOutlineFavorite onClick={() => navigate("/favoris")}   />
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={storeClick} />
            <span>{number}</span>
            </div>
            </div>
   
        )
    }
    else{
        return(
            <div className='login'>
            <div className='register'>
            <p className='inscription' onClick={()=>navigate('/register')}>Inscription</p>
            <p className='connexion' onClick={()=>navigate('/login')}>Connexion</p>
            </div>
            <div className='card'>
            <MdOutlineFavorite className='Favoris' onClick={() => navigate("/favoris")}/>
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={storeClick} />
            <span>{number}</span>
            </div>
        </div>
        )
    }
}

export default NavItems;