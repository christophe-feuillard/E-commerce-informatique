import './Link.css'
import React from 'react'

const Link = ({title, url, setURL}) => {
  return (
    <div>
      <h3 onClick={event => setURL(title.url)}>{title.title}</h3>
    </div>
  )
}

export default Link