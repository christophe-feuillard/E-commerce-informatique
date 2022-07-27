import React, {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import ModalSmall from '../../components/modalSmall/ModalSmall';
import axios from 'axios';
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
  const [articleNumber,setArticleNumber] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const [categorie,setCategorie] = useState(0);
 
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
        setStore(JSON.parse(localStorage.getItem("store")));
        setArticleNumber(store.length);
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
        url: `http://localhost:8000/api/categories/${categorie}`,
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
    <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber} categorie={setCategorie} searchClick={ ()=> searchCategorie()}/>
    <div className='homeContainer'>
      {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique} size={item.weight + ' ' + item.height+ ' ' + item.length + ' ' + item.width}
          handleckick={()=>{showMore(item)}}
          colorStore={colorStore[key]}
          clickStore={()=>{addStore(item,key)}}
        />
      ))}
    <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
       buyclick={()=>{alert("Vous avez acheté un article")} }
      smallModal={false}
    />
    <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} store={store} total={total} log={isLoading}/>
    </div>
  </>
)
}

export default Home;