import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineLocalGroceryStore,MdOutlineFavorite} from "react-icons/md";
import { GetGlobalData } from '../../useContext/AuthProviders';

import './NavItems.css';

const NavItems = ({storeClick}) => {
    const {contextStore} = GetGlobalData();
    const [store] = contextStore;
    // console.log(store.length, 'length');

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
                <div className="dropdown-content">
                    <a className='textLogin' onClick={()=> navigate("/account")}>Mon Compte</a>
                    &#124;
                    <a className='textLogin' onClick={Deconnexion}>Deconnexion</a>
                </div>
            </div>
            </div>
            <MdOutlineFavorite className='Favoris' onClick={() => navigate("/favoris")}/>
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={() => navigate("/panier")} />
            <span>{store.length}</span>
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
        
            <MdOutlineLocalGroceryStore className='storeNavItems' onClick={() => navigate("/panier")} />
            <span>{store.length}</span>
        </div>
        )
    }
}

export default NavItems;