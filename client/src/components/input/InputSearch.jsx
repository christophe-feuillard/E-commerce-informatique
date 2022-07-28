import './Input.css';

const InputSearch = ({type,placeholder,value,change}) => {
  return (
    <>
        <input className='searchBar' type={type} placeholder={placeholder} value={value}
          onChange={change}
        />
    </>
  )
}

export default InputSearch;