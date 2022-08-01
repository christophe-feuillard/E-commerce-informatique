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
            <div className='loginFlex'>
            <div className='login1'>
            <div className="dropdown">
                <AiOutlineUser className='iconNavItems'/>
                <div class="dropdown-content">
                    <a className='textLogin' onClick={()=> navigate("/account")}>Mon Compte</a>
                    &#124;
                    <a className='textLogin' onClick={()=>Deconnexion()}>Deconnexion</a>
                </div>
            </div>
            </div>
            <MdOutlineFavorite className='Favoris' onClick={() => navigate("/favoris")}/>
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={storeClick} />
            <span>{number}</span>
            </div>
   
        )
    }
    else{
        return(
            <div className='loginFlex'>
            <div className='login'>
            <div className='dropdown'>
             <div>
            <a className='textLogin' onClick={()=>navigate('/register')}>Inscription</a>
            &#124;
            <a className='textLogin' onClick={()=>navigate('/login')}>Connexion</a>
                </div>   
            </div>
        </div>
          
            <MdOutlineFavorite className='Favoris' onClick={() => navigate("/favoris")}/>
        
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={storeClick} />
            <span>{number}</span>
        </div>
        )
    }
}

export default NavItems;