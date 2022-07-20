// import React from "react";
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import Card from '../../components/card/Card';

// const CategorieReact = () => {
//   const [data, setData] = useState([]);
//   const [dataArticles, setdataArticles] = useState([]);
//   const [resultCat, setresultCat] = useState([]);

//   useEffect(() => {
//       const callAPI = async () => {
//         axios.get('/api/categorie')
//           .then(res => {
//             setData(res.data);
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }
//       callAPI();
//     }, []);

//     useEffect(() => {
//       const callAPI = async () => {
//         axios.get('/api/articles')
//           .then(res => {
//               setdataArticles(res.data);
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       }
//       callAPI();
//     }, []);

//     const filter = () => {
//       const filterResult = dataArticles.filter((curData) =>{
//           return curData.category === resultCat;
//       });
//       setdataArticles(filterResult);
//       console.log(filterResult, "filterdata");
//     }

//     // console.log(dataArticles, 'res')

//     return (
//       <>
//       <div className='homeContainer'>
//           <fieldset>
//           <legend>Choose your categorie's:</legend>
//           <div>
//                   {data.map((value) => (
//                   <div>
//                   <button type="button" id={value} name={value} onChange={() => setresultCat(value.titre)}>{value.titre}</button>
//                   </div>
//               ))}
//               <button type="button" onClick={filter}>Submit</button>
//           </div>
//           </fieldset>
//       </div>

//       <div className='homeContainer'>
//           {dataArticles.map((value) => (
//           <Card imgSrc={value.photo} title={value.titre} price={value.prix + "€"} characteristic={value.caracteristique} key={value.id}/>
//           ))}
//       </div>
//       </>
//     )
// }

// export default CategorieReact
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Card from '../../components/card/Card';

const CategorieReact = () => {
  const [data, setData] = useState([]);
  const [dataArticles, setdataArticles] = useState([]);
  const [ResetdataArticles, setResetdataArticles] = useState([]);
  const [resultCat, setresultCat] = useState([]);

  useEffect(() => {
      const callAPI = async () => {
        axios.get('/api/categorie')
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      callAPI();
    }, []);

    useEffect(() => {
      const callAPI = async () => {
        axios.get('/api/articles')
          .then(res => {
              setdataArticles(res.data);
              setResetdataArticles(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
      callAPI();
    }, []);

    const filter = () => {
      const filterResult = dataArticles.filter((curData) =>{
          return curData.category === resultCat;
      });
      setdataArticles(filterResult);
      Reset();
      console.log(filterResult, "filterdata");
    }

    const Reset = () =>{
      if(dataArticles.length !== ResetdataArticles.length) {
        setdataArticles(ResetdataArticles);
      }
    }

    console.log(dataArticles, 'res')
    console.log(ResetdataArticles, 'resetData')

    return (
      <>
      <div className='homeContainer'>
          <fieldset>
          <legend>Choose your categorie's:</legend>
          <div>
                  {data.map((value) => (
                  <div>
                  <button type="button" id={value} name={value} onClick={() => setresultCat(value.titre)}>{value.titre}</button>
                  </div>
              ))}
              <button type="button" onClick={filter}>Submit</button>
          </div>
          </fieldset>
      </div>

      <div className='homeContainer'>
          {dataArticles.map((value) => (
          <Card imgSrc={value.photo} title={value.titre} price={value.prix + "€"} characteristic={value.caracteristique} key={value.id}/>
          ))}
      </div>
      </>
    )
}

export default CategorieReact