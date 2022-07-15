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
    callAPI();

  }, []);

  const showMore = (item) =>{
    setDataModal(item);
    setOpenModal(true);
  }

return (
  <>
    <Header register={()=> navigate("/register")} />
    <div className='homeContainer'>
      {data.map((item) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=>{showMore(item)}}
        />
      ))}
    <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
       buyclick={()=>{alert("Vous avez acheté un article")} }/>
    </div>
  </>
)
}

export default Home