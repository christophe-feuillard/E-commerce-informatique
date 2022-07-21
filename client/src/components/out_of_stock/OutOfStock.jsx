import React from 'react';
import Button from '../../components/button/Button';

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
                  <Button value={"Ajouter au panier"} handelclick={()=>{alert("Vous avez acheté un article")}}/>
                  )
            ))}
    </div>
  )
}

export default OutOfStock