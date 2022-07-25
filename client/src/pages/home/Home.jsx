import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import axios from 'axios';
import "./Home.css";
import NavItems from '../../components/navItem/NavItems';

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

  const [count,setCount] = useState(1);

  const countItem = (itemId) => {
      console.log(data);
      setCount(count + 1)
      console.log(count);
  }

return (
  <>
    <Header search={search} change={(e)=>setSearch(e.target.value)}/>
    <div className='homeContainer'>

      <h2>Articles les plus populaires</h2>
      {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=> navigate("/article_details/"+item.id)}
          // handleckick={()=> countItem(item.id)}
        />
      ))}
    </div>
  </>
)
}

export default Home;