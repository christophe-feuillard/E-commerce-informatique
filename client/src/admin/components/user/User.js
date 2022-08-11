import React from 'react'

function User({data, setEdit, setElementUpdate}) {

    console.log(data)

  return (
    <div>
        <li class="py-3 sm:py-4">
                <div class="">
                    <div class="flex-1 min-w-0 flex items-center space-x-4 justify-between">
                        <div className=''>
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {data.name}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {data.email}
                            </p>
                        </div>

                        <div>
                            <div>
                         <div onClick={() => { setEdit('userform'); setElementUpdate(data);}} className="mx-8" class="mx-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            option
                            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>

                        
                        </div>
                    </div>
                </div>
            </li>
    </div>
  )
}

export default User