import {useState, useEffect} from 'react'
import { getStock } from "../../requette/requette";
import Stockcontainer from '../StockContainer/Stockcontainer';

const Rowstock = ({setEdit, setElementUpdate}) => {

    const [datastock, setDatastock] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        getStock(setDatastock, setIsLoading);
           
        },[]);

        return (
            <div>
              <table className="table-auto w-full">
              <thead>
                  <tr>
                    <th className="text-center">titre</th>
                    <th className="text-center">photo</th>
                    <th className="text-center">stock</th>
                  </tr>
               </thead>
        {isLoading && "chargement"}
        {error && error}
        {!isLoading && datastock.length === 0 && "pas d'articles"}
        {!isLoading &&
          datastock.map((v) => (
            <Stockcontainer data={v} setEdit={setEdit} setElementUpdate={setElementUpdate} />
          ))}
            </table>
            </div>
        
        )     

                

    
}
export default Rowstock;  