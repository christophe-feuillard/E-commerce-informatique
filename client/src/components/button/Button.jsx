import './Button.css'

const Button = ({value,handelclick}) => {
  return (
    <>
    <a onClick={handelclick} class="cta">
        <span>{value}</span>
    </a>
</>
  )
}

export default Button