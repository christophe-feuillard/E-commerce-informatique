import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import './Article_details.css';
import Header from "../../components/header/Header";
import Buy from '../../components/buy/Buy';

import axios from 'axios';
import { StarIcon } from '@heroicons/react/solid'


import Commentaires from '../../components/commentaires/Commentaires';
const ArticleDetails = (props) => {

    const navigate = useNavigate();
    const [articles,setArticles] = useState([]);
    let { articlesParams } = useParams();
    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem("cart");
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

    console.log(articles)

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

    const product = {
    
      details: [
        'Only the best materials',
        'Ethically and locally made',
        'Pre-washed and pre-shrunk',
        'Machine wash cold with similar colors',
      ],
    }
  
    const reviews = {
      average: 3.9,
      totalCount: 512,
      featured: [
        {
          id: 1, // (inutile car c'est auto increment en bdd)
          title: "Can't say enough good things", // rajouter une colonne comment_title dans la bdd
          rating: 5, // ça je peux peut etre reflechir a comment gerer ça en back 
          content: ` 
            <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
            <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
          `,
          author: 'Risako M', // username
          date: 'May 16, 2021', // date 
          datetime: '2021-01-06',
        },
      ],
    }

    const relatedProducts = [
      {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
        imageAlt: "Front of men's Basic Tee in white.",
        price: '$35',
        color: 'Aspen White',
      },
    ]
   
    
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
    
  return(
    <div className="bg-white">
      <main className="bg-white max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
          <div className="pt-8 lg:col-start-8 lg:col-span-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-gray-900">{articles.titre}</h1>
              <p className="text-xl font-medium text-gray-900">{articles.prix} €</p>
            </div>
            
            {/* Reviews */}
            <div className="mt-4">
              <h2 className="sr-only">Reviews</h2>
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  {reviews.average}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                  ·
                </div>
                <div className="ml-4 flex">
                  
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Voir les {reviews.totalCount} avis
                  </a>
                </div>
              </div>
                  <div>
                  <p className='mt-4 text-gray-700'>Il reste {articles.stock} en stock</p>
                  </div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
            <h2 className="sr-only">Images</h2>
                <img src={articles.photo}
                />
          </div>
          <div className="mt-8 lg:col-span-5">
            <form>
            
              <button
                type="submit"
                className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ajouter au panier
              </button>
            </form>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: articles.description }}
              />
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Caractéristiques</h2>
              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: articles.caracteristique }}
              />
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Dimensions de l'article</h2>
              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: articles.weight+ 'kg' + '  ' + articles.height+ 'cm'+ '  ' + articles.lenght+ 'cm' + '  ' + articles.width+ '"'}}
              />
            </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

              <div className="mt-4 prose prose-sm text-gray-500">
                <ul role="list">
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
           Commentaires récents
          </h2>
          <Commentaires articleId={articles.id}/>   
        </section>
      </main>
    </div>

  )
}

export default ArticleDetails;
