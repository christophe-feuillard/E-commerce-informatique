import './Button.css'

const Button = ({value,handelclick}) => {
  return (
    <>
    <a onClick={handelclick} className="cta">
        <span>{value}</span>
    </a>
</>
  )
}

export default Button