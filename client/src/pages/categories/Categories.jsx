import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Button from '../../components/button/Button'
import '../../components/card/Card.css'
import '../../components/card/Card.css'

function Categories() {
   
    const [catId, setCatId] = useState([])
    const [catData, setCatData] = useState([])
    const navigate = useNavigate()

    console.log(catId, 'retrieved id');
    console.log(catData, 'product from the cat');

    useEffect(() => {

        const getIdFromUrl = () => {
            let idFromUrl = window.location.pathname.split("/categories/")[1]; //split to get only the id in the url
            setCatId(idFromUrl); 
        }

        getIdFromUrl();

        const callAPI = (id) => {
            axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then(res => {
                setCatData(res.data.articles);
            })
            .catch(err => {
                console.log(err);
            });
        }

        callAPI(catId);
    
    }, [catId]);

    const handleClick = () => {
        navigate('/home')
    }

  return (
    <>
        <Button value={'Retour'} handelclick={handleClick}></Button>

        <div className="homeContainer">
        {catData && catData.map((item) => (
            <CatCard key={item.id} image={item.photo} title={item.titre} caracteristic={item.caracteristique} price={item.prix + "€"} />
        ))}
        </div>
    </>
  )
}

export default Categories

function CatCard(props) {
    return(
        <div className="main">
            <div className="picture">
                <img className='imgCard' src={props.image} alt="produit" />
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