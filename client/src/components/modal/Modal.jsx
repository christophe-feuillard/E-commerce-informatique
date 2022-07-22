import './Modal.css';
import Button from '../../components/button/Button';

const Modal = ({open,data,onclose,buyclick}) => {
  
if(!open) return null;
  return (
    <div className="overlay" onClick={onclose}>

        <div className="modelContainer">
            <div className='allimages'>
              <img src={data.photo} className="imageModal"/>
            </div>
            <div className="modelInfo">
                <h2>{data.titre}</h2>
                <p className='description'>{data.description}</p> 
                <p className='price'>{data.prix}€</p> 
                <p  className='price' >Il reste {Math.floor(Math.random() * 10)} en stock</p>
                <Button value={"Acheter"} handelclick={buyclick}/>
            </div>
        </div>

    </div>
  )
}

export default Modal;