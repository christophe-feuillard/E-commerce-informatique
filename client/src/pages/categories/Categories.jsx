import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Button from '../../components/button/Button'
import '../../components/card/Card.css'
import '../../components/card/Card.css'
import { useParams } from 'react-router'
import Footer from '../../components/footer/footer'

function Categories() {
   
    const [catId, setCatId] = useState(0)
    const [catData, setCatData] = useState([])
    const navigate = useNavigate()
    const {id} = useParams()

    // console.log(id)
    // useEffect(() => {
    //     const getIdFromUrl = () => {
    //         let idFromUrl = window.location.pathname.split("/categories/")[1]; //split to get only the id in the url
    //         setCatId(idFromUrl); 
    //     }
    //     getIdFromUrl();
       
       
    // }, [catData]);

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
    

    const handleClick = () => {
        navigate('/home')
    }

  return (
    <>
        <div className="flex items-center bg-white text-gray-500  hover:text-gray-600 dark:text-white cursor-pointer">
                            <p onClick={()=> navigate("/home")} className="text-sm pl-2 text-2xl leading-none dark:hover:text-gray-200">Retourner sur la page d'accueil</p>
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