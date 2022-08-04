import Link from '../link/Link'
import { useNavigate } from "react-router-dom";

const NavBAr = ({title, setEdit}) =>{
    const navigate = useNavigate()

    return (
    <div className="py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full">
        <div className=" space-y-2">
            {title.map(v =>{
            return <Link title={v} setEdit={setEdit}  />
             })}
        </div>

        <a href="##" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={()=> navigate('/home')}>
               <span className="ml-3">Retour à l'accueil</span>
      </a>
        
     </div>
  );
}

export default NavBAr;