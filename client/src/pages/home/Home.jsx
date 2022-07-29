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
  const [openModal, setOpenModal] = useState(false);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [search,setSearch] = useState("");
  const [colorStore,setColorStore] = useState([]);
  const [store,setStore] = useState([]);
  const [total,setTotal] = useState(0);
  const [fav,setFav] = useState([]);
  const [articleNumber,setArticleNumber] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [categorie,setCategorie] = useState(0);

    useEffect(() => {
      const callAPI = () => {
        axios.get('/api/articles')
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
  
    
   
  
    const showMore = (item) => {
      setDataModal(item);
      setOpenModal(true);
    }
  
    const addStore = (item,key) => {
  
      setColorStore((prev) => {
        const res = Object.assign([], prev, { [key]: !prev[key] });
       
        return res;
      });
      const exist = verifyIfExistInStore(item.id);
      if(!exist) setStore((store) => [...store, item]);
      else setStore((store) => store.slice(0,store.indexOf(item)).concat(store.slice(store.indexOf(item)+1)));
    }

    const favoris = (item) => {
     
      setFav((fav) => [...fav, item])
    }
  
    const verifyIfExistInStore = (id) => {
      for(let i = 0; i < store.length; i++){
        if(store[i].id === id) return true; 
      }
      return false;
    }
  
    const searchCategorie = () => {
  
      if(categorie !== 0){
  
        let config = {
          method: 'get',
          url: `/api/categories/${categorie}`,
          headers: { 'Content-Type': 'application/json' },
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
     useEffect(()=> localStorage.setItem("favoris", JSON.stringify(fav)),[fav])
  return (
    <>
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} categorie={setCategorie} searchClick={ ()=> searchCategorie()}/>
      <div className='homeContainer'>
            <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} store={store} total={total} log={isLoading}/>
            {/* <Favoris  /> */}
           <ArticlesPopulaires/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
            </div>
            
        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (

          <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique} stock={item.stock} size={item.weight+ 'kg' + ' ' + item.height+ 'cm'+ ' ' + item.length+ 'cm' + ' ' + item.width+ '"'}
          handleckick={()=> navigate("/article_details/"+item.id)} 
            colorStore={colorStore[key]}
            clickStore={()=>{addStore(item,key)}}
            clickFavoris={()=>{favoris(item)}}
          />
        ))}
      {/* <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
         buyclick={()=>{alert("Vous avez acheté un article")} }
        smallModal={false}
      /> */}
      </div>
      
  </>
  )}
  
    
  // return (
  //   <>
  //     <Header search={search} change={(e)=>setSearch(e.target.value)}/>
  
  //     <div className='homeContainer'>
  
  //      <ArticlesPopulaires/>    
  
  //       <div className='div_toutlesarticles'>
  //       {data.map((item,key) => (
  //         <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
  //           handleckick={()=> navigate("/article_details/"+item.id)} 
  //           // handleckick={()=> countItem(item.id)}
  //         />
  //       ))}
  //       </div>
  
  //     </div>
  //   </>
  // )
  
  
  export default Home;