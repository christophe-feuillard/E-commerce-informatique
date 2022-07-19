import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import axios from 'axios';
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [search,setSearch] = useState("");
  const [colorStore,setColorStore] = useState([]);

  useEffect(() => {
    
    const callAPI = () => {
      axios.get('/api/articles')
        .then(res => {
          setData(res.data);
          setColorStore(Array(res.data.length).fill(false))
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();

  }, []);

  const showMore = (item) => {
    setDataModal(item);
    setOpenModal(true);
  }

  const addStore = (item,key) => {
    setColorStore((prev) => {
      const res = Object.assign([], prev, { [key]: !prev[key] });
      return res;
    });
  }

return (
  <>
    <Header search={search} change={(e)=>setSearch(e.target.value)}/>
    <div className='homeContainer'>
      {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=>{showMore(item)}}
          colorStore={colorStore[key]}
          clickStore={()=>{addStore(item,key)}}
        />
      ))}
    <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
       buyclick={()=>{alert("Vous avez acheté un article")} }/>
    </div>
  </>
)
}

export default Home;