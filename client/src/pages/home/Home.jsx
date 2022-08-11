import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import ModalSmall from '../../components/modalSmall/ModalSmall';
import axios from 'axios';
import ArticlesPopulaires from '../../components/articlespopulaires/ArticlesPopulaires'
import Favoris from '../favoris/Favoris'
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [search,setSearch] = useState("");
  const [colorFavoris,setColorFavoris] = useState([]);
  const [textStore,setTextStore] = useState([]);
  const [fav,setFav] = useState( JSON.parse(localStorage.getItem("favoris")) || []);
  // const [articleNumber,setArticleNumber] = useState(0);
  // const [isLoading,setIsLoading] = useState(false);
  const [categorie,setCategorie] = useState(0);

    useEffect(() => {
      const callAPI = () => {
        axios.get('http://localhost:8000/api/articles')
          .then(res => {
            setData(res.data);
            setColorFavoris(Array(res.data.length).fill(false))
            setTextStore(Array(res.data.length).fill(false))
          })
          .catch(err => {
            console.log(err);
          });
      }
      callAPI();
    }, []);
  
    useEffect(()=> localStorage.setItem("favoris", JSON.stringify(fav)),[fav])

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
  
    const verifyIfExistInFav = (id) => {
      for(let i = 0; i < fav.length; i++){
        if(fav[i].id === id) return true; 
      }
      return false;
    }
    const searchCategorie = () => {
  
      if(categorie !== 0){
        let config = {
          method: 'get',
          url: `http://localhost:8000/api/categories/${categorie}`,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : "*"
          },
        };
        
        axios(config)
          .then(res => {
            setData(res.data.articles);
          })
          .catch(err => {
            console.log(err);
          })
      }
     }
    
  return (
    <>
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} categorie={setCategorie} searchClick={ ()=> searchCategorie()}/>
      <div className='homeContainer'>
           <ArticlesPopulaires/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
            </div>
        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (

          <Card key={key} articles={item} size={item.weight+ 'kg' + ' ' + item.height+ 'cm'+ ' ' + item.lenght+ 'cm' + ' ' + item.width+ '"'}
          handleckick={()=> navigate("/article_details/"+item.id)} 
            colorFavoris={colorFavoris[key]}
            textStore={textStore[key]}
            // clickStore={()=>{addStore(item, key)}}
            clickFavoris={()=>{favoris(item, key)}}
          />
        ))}
      </div>
      
  </>
  )}
  
  export default Home;