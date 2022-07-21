import './Link.css'
import React from 'react'

const Link = ({title, setEdit}) => {
  return (
    <div className='containerlink'>
      <h2 onClick={event => setEdit(title.url)}>{title.title}</h2>
    </div>
  )
}

export default Link