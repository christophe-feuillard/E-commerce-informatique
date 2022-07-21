import './Link.css'
import React from 'react'

const Link = ({title, setEdit}) => {
  return (
    <div className='containerlink'>
      <p onClick={event => setEdit(title.url)}>{title.title}</p>
    </div>
  )
}

export default Link