import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import axios from 'axios';
import ArticlesPopulaires from '../../components/articlespopulaires/ArticlesPopulaires'
import "./Home.css";
import MdOutlineEmail from "react-icons/md"
import Footer from '../../components/footer/footer';

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [search,setSearch] = useState("");
  const [colorFavoris,setColorFavoris] = useState([]);
  const [textStore,setTextStore] = useState([]);
  const [fav,setFav] = useState( JSON.parse(localStorage.getItem("favoris")) || []);
  const [articleNumber,setArticleNumber] = useState(0);
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
      <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} />
      {/* <CatDropDown/> */}
      <div className='homeContainer static'>
         
           <ArticlesPopulaires/>  
           <div className='hr'>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, ducimus repellendus eum earum in optio! Velit sunt perspiciatis natus nisi?
         </div> 

        {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (

          <Card key={item.id} articles={item}
            handleckick={()=> navigate("/article_details/"+item.id)} 
            colorFavoris={colorFavoris[key]}
            textStore={textStore[key]}
            clickFavoris={()=>{favoris(item, key)}}
          />
        ))}
          <div className="fixed bottom-10 right-10 cursor-pointer">
          <div onClick={()=> navigate("/contact")} className="bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-full h-14 w-14 inline-flex items-center">
          <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      // className="fixed"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>  
         </div> 
         </div>
      </div>
      <Footer/>
  </>
  )}
  
  export default Home;