import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import axios from 'axios';
import "./Home.css";
// import NavItems from '../../components/navItem/NavItems';

const Home = () => {
  
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search,setSearch] = useState("");
  const [order,setOrder] = useState("ASC");
  
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

  // const datatest = [{
  //   "id": 0,
  //   "name": "Vernon Dunham",
  //   "company": "Qualcore",
  //   "email": "vernon.dunham@qualcore.com"
  // }, {
  //   "id": 1,
  //   "name": "Dori Neal",
  //   "company": "Sunopia",
  //   "email": "dori.neal@sunopia.com"
  // }, {
  //   "id": 2,
  //   "name": "Rico Muldoon",
  //   "company": "Airconix",
  //   "email": "rico.muldoon@airconix.com"
  // }]
  
  // const sorted = datatest.map(d => ({id: d.id, name: d.name})).sort((el1, el2) => el2.id - el1.id)
  // console.log(sorted)

  const sorted = data.map(d => ({id: d.id, titre: d.titre, prix: d.prix, photo: d.photo, description: d.description, visit: d.visit, caracteristique: d.caracteristique})).sort((el1, el2) => el2.visit - el1.visit)
  console.log(data)

return (
  <>
    <Header search={search} change={(e)=>setSearch(e.target.value)}/>
    <div className='homeContainer'>

      <h2>Articles les plus populaires</h2>
      <div className='div_articlepopulaire'>
      {sorted.map((item,key) => (
        key < 3 && <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=> navigate("/article_details/"+item.id)} 
          // handleckick={()=> countItem(item.id)}
        />
      ))}
      </div>

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