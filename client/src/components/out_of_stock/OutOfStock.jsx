import React, {useState, useEffect} from 'react';
import axios from 'axios';

function OutOfStock() {

    const [stock, setStock] = useState([]);

    //console.log(stock, 'whats in the stock');

    useEffect(() => {
    
    const callAPI = () => {
      axios.get('/api/articles')
      .then(res => {
        for (let i = 0; i < res.data.length; i ++) 
        {
          setStock(stock => [...stock, res.data[i].stock])
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
        callAPI();

    }, []);
  
  console.log(stock);

  return (
    <div>
        {stock.map(stock => (
                  stock === 0 || stock === null ? (
                  <p className="rupture">Rupture de stock</p>
                  ) : (
                  <button onClick="">Ajouter au panier</button>
                  )
            ))}
    </div>
  )
}

export default OutOfStock