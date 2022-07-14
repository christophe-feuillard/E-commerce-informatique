import React, {useEffect,useState} from 'react';
import Header from "../../components/header/Header";
import Card from '../../components/card/Card';
import axios from 'axios';

const Home = () => {

    const [data, setData] = useState([]);

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

  return (
    <>
      <Header />
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {data.map((item) => (
          <Card imgSrc={item.photo} title={item.titre} price={item.prix + "€"} characteristic={item.caracteristique}/>
        ) 
        )}
      </div>
    </>
  )
}

export default Home