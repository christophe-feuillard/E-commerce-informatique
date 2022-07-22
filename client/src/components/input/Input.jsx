
import InputModel from '../../../model/InputModel';
import './Input.css';

const Input = ({data}) => {
  return (
    <div>
        <input className="" type={data.type} placeholder={data.placeholder} value={data.value}
          onChange={change}
        />
    </div>
  )
}

export default Input;