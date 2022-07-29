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
  const [colorStore,setColorStore] = useState([]);
  const [store,setStore] = useState([]);
  const [total,setTotal] = useState(0);
  const [articleNumber,setArticleNumber] = useState(0);
  const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
      const callAPI = () => {
        axios.get('http://127.0.0.1:8000/api/articles')
          .then(res => {
            setData(res.data);
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
  
  
    const addStore = (item,key) => {
  
      setColorStore((prev) => {
        const res = Object.assign([], prev, { [key]: !prev[key] });
        return res;
      });
  
      const exist = verifyIfExistInStore(item.id);
      if(!exist) setStore((store) => [...store, item]);
      else setStore((store) => store.slice(0,store.indexOf(item)).concat(store.slice(store.indexOf(item)+1)));
    }
  
    const verifyIfExistInStore = (id) => {
      for(let i = 0; i < store.length; i++){
        if(store[i].id === id) return true; 
      }
      return false;
    }
  
  return (
    <>
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} />
      <CatDropDown/>
      <div className='homeContainer'>
            <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} store={store} total={total} log={isLoading}/>
           <ArticlesPopulaires/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
      </div> 

        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (
          <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique} size={item.weight + ' ' + item.height+ ' ' + item.length + ' ' + item.width}
          handleckick={()=> navigate("/article_details/"+item.id)} 
            colorStore={colorStore[key]}
            clickStore={()=>{addStore(item,key)}}
          />
        ))}
      </div>
  </>
)}

export default Home;