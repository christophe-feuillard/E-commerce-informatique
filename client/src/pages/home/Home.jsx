import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import ModalSmall from '../../components/modalSmall/ModalSmall';
import axios from 'axios';
import ArticlesPopulaires from '../../components/articlespopulaires/ArticlesPopulaires'
import "./Home.css";
import CatDropDown from '../../components/drop-down-cat/CatDropDown';

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [search,setSearch] = useState("");
  const [colorFavoris,setColorFavoris] = useState([]);
  const [textStore,setTextStore] = useState([]);
  const [store,setStore] = useState([]);
  const [total,setTotal] = useState(0);
  const [fav,setFav] = useState([]);
  const [articleNumber,setArticleNumber] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
      const callAPI = () => {
        axios.get('http://127.0.0.1:8000/api/articles')
          .then(res => {
            setData(res.data);
            setColorFavoris(Array(res.data.length).fill(false))
            setTextStore(Array(res.data.length).fill(false))
          })
          .catch(err => {
            console.log(err);
          });
      }
  
      const VerifyUser = () => {
      if(localStorage.getItem("token") != null) setIsLoading(true);
      else setIsLoading(false);
      }
  
      callAPI();
      VerifyUser();
    }, []);
  
    useEffect(() => {
      setTotal(store.reduce((acc,item) => acc + item.prix,0));
      localStorage.setItem("store", JSON.stringify(store));
      setArticleNumber(store.length);
    },[store]);
  
  
    const addStore = (item, key) => {
  
      const exist = verifyIfExistInStore(item.id);
      if(!exist) setStore((store) => [...store, item]);
      else setStore((store) => store.slice(0,store.indexOf(item)).concat(store.slice(store.indexOf(item)+1)));

      setTextStore((prev) => {
        const res = Object.assign([], prev, { [key]: !prev[key] });
        return res;
      });
    }

    const favoris = (item, key) => {
     
      const exist = verifyIfExistInFav(item.id);
      
      console.log(exist)
      if(!exist)  setFav((fav) => [...fav, item]);
      else setFav((fav) => fav.slice(0,fav.indexOf(item)).concat(fav.slice(fav.indexOf(item)+1)));

      setColorFavoris((prev) => {
        const res = Object.assign([], prev, { [key]: !prev[key] });
        return res;
      });

    }
  
    const verifyIfExistInStore = (id) => {
      for(let i = 0; i < store.length; i++){
        if(store[i].id === id) return true; 
      }
      return false;
    }
  
    const verifyIfExistInFav = (id) => {
      for(let i = 0; i < fav.length; i++){
        if(fav[i].id === id) return true; 
      }
      return false;
    }
    
    useEffect(()=> localStorage.setItem("favoris", JSON.stringify(fav)),[fav])
  return (
    <>
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} />
      <CatDropDown/>
      <div className='homeContainer'>
            <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} store={store} total={total} log={isLoading}/>
           <ArticlesPopulaires store={store}/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
      </div> 

        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (

          <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique} stock={item.stock} size={item.weight+ 'kg' + ' ' + item.height+ 'cm'+ ' ' + item.length+ 'cm' + ' ' + item.width+ '"'}
          handleckick={()=> navigate("/article_details/"+item.id)} 
            colorFavoris={colorFavoris[key]}
            textStore={textStore[key]}
            clickStore={()=>{addStore(item, key)}}
            clickFavoris={()=>{favoris(item, key)}}
          />
        ))}
      </div>
  </>
)}

export default Home;