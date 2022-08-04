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
  // const [openModal, setOpenModal] = useState(false);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [search,setSearch] = useState("");
  const [colorFavoris,setColorFavoris] = useState([]);
  const [textStore,setTextStore] = useState([]);
  // const [store,setStore] = useState(   JSON.parse(localStorage.getItem("store")) || []);
  // const [total,setTotal] = useState(0);
  const [fav,setFav] = useState( JSON.parse(localStorage.getItem("favoris")) || []);
  const [articleNumber,setArticleNumber] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [categorie,setCategorie] = useState(0);

    useEffect(() => {
      const callAPI = () => {
        axios.get('https://localhost:8000/api/articles')
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
  

  //  useEffect(() => {
    
  //  }) 

    // useEffect(() => {
    //   if (store.length == 0 ) {
    //     setTotal(store.reduce((acc,item) => acc + item.prix,0));   //
    //   }
    //     console.log("store",store)
    //     localStorage.setItem("store", JSON.stringify(store));
    //   setArticleNumber(store.length);
    // },[store]);
  
    useEffect(()=> localStorage.setItem("favoris", JSON.stringify(fav)),[fav])
    // const showMore = (item) => {
    //   setDataModal(item);
    //   setOpenModal(true);
    // }
  
    // const addStore = async (item, key) => {
      // await axios.get('https://localhost:8000/api/panier/add/'+ item.id)
      // .then(res => {
      // console.log(res.data)
      // })
      // .catch(err => {
      //   console.log(err);
      // });


    //   const exist = verifyIfExistInStore(item.id);
    //   console.log(item)
    //   if(!exist) setStore((store) => [...store, item]);
    //   else setStore((store) => store.slice(0,store.indexOf(item)).concat(store.slice(store.indexOf(item)+1)));

    //   setTextStore((prev) => {
    //     const res = Object.assign([], prev, { [key]: !prev[key] });
    //     return res;
    //   });
    // }

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
  
    // const verifyIfExistInStore = (id) => {
    //   for(let i = 0; i < store.length; i++){
    //     if(store[i].id === id) return true; 
    //   }
    //   return false;
    // }
  
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
          url: `https://localhost:8000/api/categories/${categorie}`,
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
    

  return (
    <>
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} categorie={setCategorie} searchClick={ ()=> searchCategorie()}/>
      <div className='homeContainer'>
            <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} log={isLoading}/>
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