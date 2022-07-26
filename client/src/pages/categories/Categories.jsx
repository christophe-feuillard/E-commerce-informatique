import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Categories() {

    const [catId, setCatId] = useState([])
    const [catData, setCatData] = useState([])

    console.log(catId, 'retrieved id');
    console.log(catData, 'product from the cat');

    // fonction recuperer l'id from url ou autre par, stock ca dans une var id ensuite fonction qui recup les articles en fonction de l'id passer en params 

    
    useEffect(() => {

        const getProductsFromCat = () => {
            axios.get('/api/categories')
            .then(res => {

                setCatId(res.data[0].id);
            })
            .catch(err => {
                console.log(err);
            });
        }

        getProductsFromCat();

        const callAPI = (id) => {
            axios.get(`/api/categories/${id}`)
            .then(res => {
    
                setCatData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }

        callAPI(catId);
    
    }, []);

  return (
    <div>
       {/* render catData */}
    </div>
  )
}

export default Categories