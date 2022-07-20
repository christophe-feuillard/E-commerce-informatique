import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../../components/card/Card';

const CategorieReact = () => {
  const [data, setData] = useState([]);
  const [dataArticles, setdataArticles] = useState([]);
  const [resultCat, setresultCat] = useState([]);

  useEffect(() => {
      const callAPI = async () => {
        axios.get('/api/categorie')
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      callAPI();
    }, []);

    useEffect(() => {
      const callAPI = async () => {
        axios.get('/api/articles')
          .then(res => {
              setdataArticles(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      callAPI();
    }, []);

  const filter = () => {
      const filterData = dataArticles.filter(item => item.category === resultCat);
      console.log(filterData, "filterdata");

      return filterData;
  }

    return (
      <>
      <div className='homeContainer'>
          <fieldset>
          <legend>Choose your categorie's:</legend>
          <div>
                  {data.map((value) => (
                  <div>
                  <button type="button" id={value} name={value} onClick={() => setresultCat(value.titre)}>{value.titre}</button>
                  </div>
              ))}
              <button type="button" onClick={filter}>Submit</button>
          </div>
          </fieldset>
      </div>

      <div className='homeContainer'>
          {dataArticles.map((value) => (
          <Card imgSrc={value.photo} title={value.titre} price={value.prix + "€"} characteristic={value.caracteristique} key={value.id}/>
          ))}
      </div>
      </>
    )
}

export default CategorieReact
