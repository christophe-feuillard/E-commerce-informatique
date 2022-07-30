import './Input.css';

const InputCard = ({type,placeholder,value,change, id}) => {
  return (
    <>
    <label  htmlFor={id}>{placeholder}</label>
        <input className='inputCard' id={id} type={type}  value={value}
          onChange={change}
        />
    </>
  )
}

export default InputCard;