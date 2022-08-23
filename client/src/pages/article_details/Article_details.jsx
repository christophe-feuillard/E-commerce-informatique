import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Article_details.css';
import Header from "../../components/header/Header";
import Buy from '../../components/buy/Buy';
import axios from 'axios';
import Commentaires from "../../components/commentaires/Commentaires";
import returnArrow from "../../asset/return.png"
// import { Fragment } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import {
  CurrencyDollarIcon,
  GlobeIcon,

} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'


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
      name: 'Basic Tee',
      price: '$35',
      href: '#',
      breadcrumbs: [
        { id: 1, name: 'Women', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
      ],
      images: [
        {
          id: 1,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
          imageAlt: "Back of women's Basic Tee in black.",
          primary: true,
        },
        {
          id: 2,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg',
          imageAlt: "Side profile of women's Basic Tee in black.",
          primary: false,
        },
        {
          id: 3,
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg',
          imageAlt: "Front of women's Basic Tee in black.",
          primary: false,
        },
      ],
      colors: [
        { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
        { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
      ],
      sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: false },
      ],
      description: `
        <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
        <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
      `,
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
          id: 1,
          title: "Can't say enough good things",
          rating: 5,
          content: `
            <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
            <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
          `,
          author: 'Risako M',
          date: 'May 16, 2021',
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
      <main className="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
                    Voire les {reviews.totalCount} avis
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

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Description</h2>
              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: articles.description }}
              />
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Caractéristique</h2>
              <div
                className="mt-4 prose prose-sm text-gray-500"
                dangerouslySetInnerHTML={{ __html: articles.caracteristique }}
              />
            </div>
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Dimension de l'article</h2>
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

        {/* Reviews */}
        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
           Commentaire récents
          </h2>

          <div className="mt-6 border-t border-b border-gray-200 pb-10 divide-y divide-gray-200 space-y-10">
            {reviews.featured.map((review) => (
              <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                    <h3 className="text-sm font-medium text-gray-900">{review.title}</h3>

                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-gray-900">{review.author}</p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {review.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>


        
        {/* Related products */}
        {/* <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2 id="related-heading" className="text-lg font-medium text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group relative">
                <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={relatedProduct.imageSrc}
                    alt={relatedProduct.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={relatedProduct.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{relatedProduct.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{relatedProduct.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </main>
      {/* <Commentaires articleId={articles.id}/>    */}
    </div>

  )
}

export default ArticleDetails;
