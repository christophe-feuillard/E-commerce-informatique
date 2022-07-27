import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import ArticlesPopulaires from "../../components/articlespopulaires/ArticlesPopulaires";
import axios from 'axios';
import "./Home.css";
// import NavItems from '../../components/navItem/NavItems';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search,setSearch] = useState("");
  
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
    callAPI();

  }, []);

return (
  <>
    <Header search={search} change={(e)=>setSearch(e.target.value)}/>

    <div className='homeContainer'>

     <ArticlesPopulaires/>    

      <div className='div_toutlesarticles'>
      {data.map((item,key) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=> navigate("/article_details/"+item.id)} 
          // handleckick={()=> countItem(item.id)}
        />
      ))}
      </div>

    </div>
  </>
)
}

export default Home;