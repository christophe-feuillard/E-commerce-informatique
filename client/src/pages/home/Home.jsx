import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import axios from 'axios';
import ArticlesPopulaires from '../../components/articlespopulaires/ArticlesPopulaires'
import "./Home.css";
import Footer from '../../components/footer/footer';
import img from '../../asset/tel.png'
// import { CenterModal } from 'react-spring-modal';

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [search,setSearch] = useState("");
  const [colorFavoris,setColorFavoris] = useState([]);
  const [textStore,setTextStore] = useState([]);
  const [fav,setFav] = useState( JSON.parse(localStorage.getItem("favoris")) || []);
  const [articleNumber,setArticleNumber] = useState(0);
  const [categorie,setCategorie] = useState(0);
  const [isOpen, setOpen] = useState(false);

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
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} data={data}/>
      {/* <CatDropDown/> */}
      <div className='homeContainer static'>
       {/* <CenterModal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        style={{
          backgroundColor: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.25rem'
        }}
      >
        <h1>My Center Modal</h1>
        <button onClick={() => setOpen(false)}>Close</button>
      </CenterModal> */}
         
           <ArticlesPopulaires/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
         </div> 

        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (

          <Card key={item.id} articles={item}
            handleckick={()=> navigate("/article_details/"+item.id)} 
            colorFavoris={colorFavoris[key]}
            // openModal={setOpen(true)}
            textStore={textStore[key]}
            clickFavoris={()=>{favoris(item, key)}}
          />
        ))}
          <div className="fixed bottom-10 right-10 cursor-pointer">
          <div onClick={()=> navigate("/contact")} className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center">
        <img src={img} alt="" />
         </div> 
         </div>
      </div>
      <Footer/>
  </>
  )}
  
  export default Home;