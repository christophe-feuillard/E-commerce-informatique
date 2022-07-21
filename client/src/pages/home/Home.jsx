import React, {useEffect,useState} from 'react';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import axios from 'axios';
import "./Home.css";
import OutOfStock from '../../components/out_of_stock/OutOfStock';

const Home = () => {

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [search,setSearch] = useState("");
  const [stock, setStock] = useState([]);
  const [disableModal, setDisableModal] = useState(0);
  
  useEffect(() => {
    
    const callAPI = () => {
      axios.get('/api/articles')
      .then(res => {

          setData(res.data);

          for (let i = 0; i < res.data.length; i ++)
          {
            setStock(stock => [...stock, res.data[i].stock])
            // setDisableModal(disableModal => [...disableModal, res.data[i].stock])  
          } 
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
    <Header search={search} change={(e)=>setSearch(e.target.value)}/>
    <div className='homeContainer'>
      {data.filter((item)=>item.titre.toLowerCase().includes(search)).map((item) => (
        <Card key={item.id} imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}
          handleckick={() => { showMore(item);}}/>
      ))}
        
        <OutOfStock stock={stock}/>

      {disableModal === 0 ? (
      <Modal onclose={()=>setOpenModal(false)} />
      ) : (
      <Modal open={openModal} data={dataModal} onclose={()=>setOpenModal(false)} 
        buyclick={()=>{alert("Vous avez acheté un article")} }/>
      )}
    </div>
  </>
)
}

export default Home;