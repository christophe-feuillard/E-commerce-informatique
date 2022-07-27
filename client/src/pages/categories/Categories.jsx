import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Button from '../../components/button/Button'
import '../../components/card/Card.css'

function Categories() {
   
    const [catId, setCatId] = useState([])
    const [catData, setCatData] = useState([])
    const navigate = useNavigate()

    // console.log(catId, 'retrieved id');
    // console.log(catData, 'product from the cat');

    // fonction recuperer l'id from url ou autre par, stock ca dans une var id ensuite fonction qui recup les articles en fonction de l'id passer en params 

    
    useEffect(() => {

        const getIdFromUrl = () => {
            let idFromUrl = window.location.pathname.split("/categories/")[1]; //split to get only the id in the url
            setCatId(idFromUrl); 
        }

        getIdFromUrl();

        const callAPI = (id) => {
            axios.get(`/api/categories/${id}`)
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
                <img src={props.image} alt="produit" />
            </div>

            <div className="contentCard">
                <h3>{props.title}</h3>
                <div className="divCharacteristic">
                    <p>{props.caracteristic}</p>
                </div>
                <p className="price">{props.price}</p>
                <div className='divIconsCard'>
                    <Button value={'Ajouter au panier'} handelclick={''}/>
                </div>
            </div>
        </div>
    )
}