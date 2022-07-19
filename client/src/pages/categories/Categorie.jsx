import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../../components/card/Card';

const CategorieReact = () => {
    const [data, setData] = useState([]);
    const [dataArticles, setdataArticles] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [articles, setArticles] = useState([]);

    // const articleId = data[0];
    const categoryId = articles[0];

    // const allId = () => {
    //   Tant que i < data.id(object) alors => itemId++(data[0++])
    // } 

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
    // console.log(articles);
    // console.log(categoryId);

    const filter = () => {
        const filterData = articles.filter(item => item === categoryId).map(item => {
          return item;
        });
        console.log(filterData, "filterdata");
        // si item.category === category.id
        return filterData;
    }

      return (
        <>
        <div className='homeContainer'>
            <fieldset>
            <legend>Choose your categorie's:</legend>
            <div>
                {/* {data.map((value) => (
                    <div>
                    <input type="checkbox" id={value.id} name={value.id}/>
                    <label htmlFor={value.id}>{value.titre}</label>
                    </div>
                ))} */}
                    {data.map((value) => (
                    <div>
                    <button type="button" id={value.id} name={value.id} onClick={filter}>{value.titre}</button>
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
        {/* <div className='homeContainer'>
            {data.map((value) => (
            <Card imgSrc={value.articles[0].photo} title={value.articles[0].titre} price={value.articles[0].prix + "€"} characteristic={value.articles[0].caracteristique} key={value.articles.id}/>
            ))}
        </div> */}
        </>
      )
}

export default CategorieReact