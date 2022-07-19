import './Link.css'
import React from 'react'

const Link = ({title, url, setURL}) => {
  return (
    <div className='containerlink'>
      <h2 onClick={event => setURL(title.url)}>{title.title}</h2>
    </div>
  )
}

export default Link