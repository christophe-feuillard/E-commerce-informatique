import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineLocalGroceryStore,MdOutlineFavorite} from "react-icons/md";
import { GetGlobalData } from '../../useContext/AuthProviders';

import './NavItems.css';

const NavItems = () => {
    const {contextStore, contextUser, contextToken} = GetGlobalData();
    const [store] = contextStore;
    const [user, setUser] = contextUser;
    const [token, setToken] = contextToken;

    const navigate = useNavigate();

    const Deconnexion = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        navigate('/');
    }
    if(user){
        return(
            <div className='loginFlex'>
            <div className='login1'>
            <div className="dropdown">
                <AiOutlineUser className='iconNavItems'/>
                <div className="dropdown-content">
                    <a className='textLogin' onClick={()=> navigate("/account")}>Mon Compte</a>
                    &#124;
                    <a className='textLogin' onClick={()=>Deconnexion()}>Déconnexion</a>
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
            <Link className='textLogin' to="/register">S'inscrire</Link>
            &#124;
            
            <Link className='textLogin' to={"/login"}>Se connecter</Link>
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