import './Card.css';
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import {AiOutlineHeart} from "react-icons/ai";

const Card = ({imgSrc,title,characteristic,price,handleckick}) => {

  return (
    <div className='main'>
        <div className="picture" onClick={handleckick}>
            <img src={imgSrc} alt="image du produit"/>
        </div>
        <div className="contentCard">
            <h3 onClick={handleckick}>{title}</h3>
            <p className='characteristic'>{characteristic}</p>
            <p className='price'>{price}</p>
            <div className='divIconsCard'>
                <MdOutlineLocalGroceryStore className='iconCard'/>
                <AiOutlineHeart className='iconCard'/>
            </div>
        </div>
    </div>
  )
}

export default Card