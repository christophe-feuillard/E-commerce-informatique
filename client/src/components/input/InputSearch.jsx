import './Input.css';

const InputSearch = ({type,placeholder,value,change}) => {
  return (
    <>
      <div className="w-full bg-gray-100 rounded-md hidden xl:flex items-center">
      <select className="text-slate-900 bg-transparent uppercase font-bold text-sm p-4 mr-4" name="" id="">
        <option>all categories</option>
      </select>
      <input className="searchBar outline-none text-slate-900 w-full border-l border-gray-300 bg-transparent font-semibold " type={type} placeholder={placeholder} value={value}  onChange={change}/>
      {/* <svg class="ml-auto h-5 px-4 text-gray-500" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16 fa-9x"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg> */}
    </div>
        {/* <input className='searchBar' type={type} placeholder={placeholder} value={value}
          onChange={change}
        /> */}
    </>
  )
}

export default InputSearch;