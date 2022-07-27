import './Buy.css'

const Buy = ({onAdd,articlesPrix}) => {
  return (
    <div className="price" onClick={onAdd}> 
     <i className="fa-solid fa-cart-shopping"></i>
     <span>{articlesPrix}</span>          
   </div>
  )
}

export default Buy