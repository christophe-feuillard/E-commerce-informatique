import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import '../../components/card/Card.css'
import '../../components/card/Card.css'
import { useParams } from 'react-router'
import Footer from '../../components/footer/footer'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Header from '../../components/header/Header'

function Categories() {

    const [catData, setCatData] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const callAPI = () => {
            axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then(res => {
                setCatData(res.data.articles);
            })
            .catch(err => {
                console.log(err);
            });
        }
        callAPI();

    }, [])
    
  return (
    <>
    {/* <Header/> */}
        <div className="flex items-center bg-white text-gray-500  hover:text-gray-600 dark:text-white cursor-pointer">
                        <Breadcrumbs className='text-gray-900' separator={'//'} maxItems={2} aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/home">
    Home
  </Link>
  <Link underline="hover" color="red" href="/register">
    Catégories
  </Link>
</Breadcrumbs>
                        </div>
        <div className="homeContainer">
        {catData && catData.map((item) => (
            <CatCard key={item.id} image={item.photo} title={item.titre} caracteristic={item.caracteristique} price={item.prix + "€"}/>
        ))}
        </div>
           <Footer/>
    </>
  )
}

export default Categories

function CatCard(props) {
    return(
        <div className="main">
            <div className="picture">
                <img className='imgCard' src={props.image} alt="produit"/>
            </div>

            <div className="contentCard">
                <p className='titleCard'>{props.title}</p>
                <div className='divCharacteristic'>
                    <p className='characteristic'>{props.caracteristic}</p>
                    <p className='size'>{props.size}</p>
                </div>
                <p className="price">{props.price}</p>
            </div>
         
        </div>
    )
}