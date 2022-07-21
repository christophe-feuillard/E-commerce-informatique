
import './Input.css';

const Input = ({type,placeholder,value,change}) => {
  return (
    <>
        <input type={type} placeholder={placeholder} value={value}
          onChange={change}
        />
    </>
  )
}

export default Input;