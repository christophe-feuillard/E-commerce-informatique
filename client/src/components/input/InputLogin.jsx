import './Input.css';

const InputLogin = ({type,placeholder,value,change}) => {
  return (
    <>
        <input className='inputLogin' type={type} placeholder={placeholder} value={value}
          onChange={change}
        />
    </>
  )
}

export default InputLogin;