import './Input.css';

const InputRegister = ({type,placeholder,value,change}) => {
  return (
    <>
        <input className='inputRegister' type={type} placeholder={placeholder} value={value}
          onChange={change}
        />
    </>
  )
}

export default InputRegister;