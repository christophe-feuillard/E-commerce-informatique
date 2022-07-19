import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../../components/card/Card';

const CategorieReact = () => {
    const [data, setData] = useState([]);
    const [dataArticles, setdataArticles] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [articles, setArticles] = useState([]);
    // let categoryId = articles[0];
    const [categoryId, setcategoryId] = useState(articles);

    const iterationId = () => {
      for(let i = 0; i < data.length; i++) {
        setcategoryId(articles[i]);
        // console.log(i);
      }
      console.log(categoryId , 'categoryId')
      return categoryId
    }

    useEffect(() => {
        const callAPI = async () => {
          axios.get('/api/categorie')
            .then(res => {
              setData(res.data);
              setCategorie(data.map((item) => item.titre))
              setArticles(data.map((item) => item.articles))
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

    // console.log(data);
    // console.log(categorie);
    // console.log(articles[1]);
    // console.log(categoryId);
    // console.log(data.length)

    const filter = () => {
        iterationId();
        const filterData = articles.filter(item => item === categoryId).map(item => {
          return item;
        });
        // const result =  data.map((item) => {return item.titre})
        // const filterData = result.filter(item => item.titre === categorie)
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
                    <button type="button" id={value.id} name={value.id} key={categoryId} onClick={filter}>{value.titre}</button>
                    </div>
                ))}
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