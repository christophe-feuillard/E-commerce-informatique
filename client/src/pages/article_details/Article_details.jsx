import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './Article_details.css';
import Header from "../../components/header/Header";
import Buy from '../../components/buy/Buy';
import axios from 'axios';

const ArticleDetails = (props) => {

  const navigate = useNavigate();

    const [articles,setArticles] = useState([]);
    let { articlesParams } = useParams();
    console.log(articles);

    const fetchData = () => {
      axios.get(`http://localhost:8000/api/article/${articlesParams}`)
      .then ((res) => {
        // console.log(res.data)
        setArticles(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    useEffect(() => {
      fetchData()
    }, [])

    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem("cart");
    
    const addItem = (item) => {
      // create a copy of our cart state, avoiarticlesd overwritting existing state
      let cartCopy = [...cart];
      // assuming we have an ID field in our item
      let {ID} = articles.id;      
      //look for item in cart array
      let existingItem = cartCopy.find(cartItem => cartItem.ID == ID);     
      //if item already exists
      if (existingItem) {
          existingItem.quantity += item.quantity //update item
      } else { //if item doesn't exist, simply add it
        cartCopy.push(item)
      }      
      // update app state
      setCart(cartCopy)     
      // make cart a string and store in local space
      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", articles.id)
    }

  return(
    <>
    <Header register={()=> navigate("/register")} />
    <main>
      <div className="container">
        <div>
          <div className="img_article_container">
           <img className="img_article" src={articles.photo} alt="photo" />
          </div>
  
          <div className="details_article">
            <div>
              <h3>{articles.titre}</h3>
              <ul>
                <li> Poids : {articles.weight} g </li>
                <li>Longueur : {articles.lenght} cm</li>
                <li> Largeur : {articles.width} "</li>
                <li> Hauteur : {articles.height} cm</li>
              </ul>
              <p>Il reste {articles.stock} en stock</p>

              <p>
                {articles.description}
              </p>
                <p>{articles.caracteristique}</p>

            <Buy articlesPrix={articles.prix + '€'} onAdd={addItem}/>
            </div>

          </div>

        </div>
      </div>
    </main>      
    </>
  )
}

export default ArticleDetails;