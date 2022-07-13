import './Button.css'

const Button = ({value,handleckick}) => {
  return (
    <>
    <a onClick={handleckick} class="cta">
        <span>{value}</span>
    </a>

</>
  )
}

export default Button