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
        {isLoading && "chargement"}
        {error && error}
        {!isLoading && datastock.length === 0 && "pas d'articles"}
        {!isLoading &&
          datastock.map((v) => (
            <Stockcontainer data={v} setEdit={setEdit} setElementUpdate={setElementUpdate} />
          ))}
            </div>
        
        )     

                

    
}
export default Rowstock;