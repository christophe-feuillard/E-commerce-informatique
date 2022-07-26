import React from 'react';

function OutOfStock({stock}) {

//     const [stock, setStock] = useState([]); // la logique a faire dans home ici que l'affichage du component

//     useEffect(() => {
    
//     const callAPI = () => {
//       axios.get('/api/articles')
//       .then(res => {
//         for (let i = 0; i < res.data.length; i ++) setStock(stock => [...stock, res.data[i].stock])
//         })
//         .catch(err => {
//         console.log(err);
//         });
//         }
//         callAPI();

//     }, []);
  
//   console.log(stock);

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