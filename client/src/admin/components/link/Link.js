import './Link.css'
import React from 'react'

const Link = ({title, setEdit}) => {
  return (
    <div>
    
      <a href="##" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={event => setEdit(title.url)}>
               <span className="ml-3">{title.title}</span>
      </a>

    </div>
  )
}

export default Link