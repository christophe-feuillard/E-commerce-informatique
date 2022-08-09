import React, {useEffect,useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AiOutlineUser} from "react-icons/ai";
import {MdOutlineLocalGroceryStore,MdOutlineFavorite} from "react-icons/md";
import { GetGlobalData } from '../../useContext/AuthProviders';

import './NavItems.css';
// import Link from '../../admin/components/link/Link';

const NavItems = () => {
    const {contextStore, contextUser} = GetGlobalData();
    const [store] = contextStore;
    const [user, setUser] = contextUser;

    const navigate = useNavigate();
    // const [isLogged, setIsLogged] = useState(false);
    
    // useEffect(() => {
    //     const Token = localStorage.getItem("token");
    //     if(Token) setIsLogged(true);
    //     console.log(login)
    // },[]);


    const Deconnexion = () => {
        localStorage.removeItem('token');
        setUser(null)
        navigate('/');
    }

    const handleClick = () => {
        navigate('/login')
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
                    <a className='textLogin' onClick={()=>Deconnexion()}>Logout</a>
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
            {/* <a className='textLogin' onClick={()=>navigate('/register')}>Inscription</a> */}
            <Link className='textLogin' to="/register">Register</Link>
            &#124;
            
            <a className='textLogin' onClick={handleClick}>Login</a>
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