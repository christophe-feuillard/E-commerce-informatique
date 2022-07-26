import React, {useEffect,useState} from 'react';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import ModalSmall from '../../components/modalSmall/ModalSmall';
import axios from 'axios';
import "./Home.css";
// import OutOfStock from '../../components/out_of_stock/OutOfStock';
import CatDropDown from '../../components/drop-down-cat/CatDropDown';

const Home = () => {

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalSmall, setOpenModalSmall] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [search,setSearch] = useState("");
  const [stock, setStock] = useState([]); // pour le out of stock
  const [disableModal, setDisableModal] = useState(0); // pour le out of stock
  
  const [colorStore,setColorStore] = useState([]);
  const [store,setStore] = useState([]);
  const [total,setTotal] = useState(0);
  const [articleNumber,setArticleNumber] = useState(0);

  useEffect(() => {
    const callAPI = () => {
      axios.get('/api/articles')
      .then(res => {

          setData(res.data);

          for (let i = 0; i < res.data.length; i ++) // pour le out of stock
          {
            setStock(stock => [...stock, res.data[i].stock])
            // setDisableModal(disableModal => [...disableModal, res.data[i].stock])  
          } 
          setColorStore(Array(res.data.length).fill(false))
        })
        .catch(err => {
          console.log(err);
        });
        setStore(JSON.parse(localStorage.getItem("store")));
        setArticleNumber(store.length);
    }
    callAPI();

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
    console.log(exist);
    if(!exist) setStore((store) => [...store, item]);
    else setStore((store) => store.slice(0,store.indexOf(item)).concat(store.slice(store.indexOf(item)+1)));
  }

  const verifyIfExistInStore = (id) => {
    for(let i = 0; i < store.length; i++){
      if(store[i].id === id) return true; 
    }
    return false;
  }

return (
  <>
    <Header search={search} change={(e)=>setSearch(e.target.value)} storeClick={()=>setOpenModalSmall(true)} articleNumber={articleNumber}/>
    <div className='homeContainer'>

      {/* Pour le out of stock */}

      {/* {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item) => (
        <Card key={item.id} imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={() => { showMore(item);}}/>
      ))}
        
        <OutOfStock stock={stock}/>

      {disableModal === 0 ? (
      <Modal onclose={()=>setOpenModal(false)} />
      ) : (
      <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
        buyclick={()=>{alert("Vous avez acheté un article")} }/>
      )} */}

      {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item,key) => (
        <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={()=>{showMore(item)}}
          colorStore={colorStore[key]}
          clickStore={()=>{addStore(item,key)}}
        />
      ))}
    <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
       buyclick={()=>{alert("Vous avez acheté un article")} }
      smallModal={false}
    />
    <ModalSmall open={openModalSmall} onclose={()=>setOpenModalSmall(false)} store={store} total={total}/>

      <CatDropDown />
    </div>
  </>
)
}

export default Home;