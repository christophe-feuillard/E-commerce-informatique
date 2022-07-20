import Ptag from "../ptag/Ptag";
import './personalInfo.css'
import { useNavigate } from "react-router-dom";
const PersonalInfo = ({data}) => {
    const navigate = useNavigate();

    return (
        <div>
            <article className="infoperso">
                {Object.keys(data).map(function(key, value) {
                return <Ptag data={key} yoyo={data[key]} />
                })}
            </article>
            <h2 className="backhome" onClick={()=> navigate('/home')}>Retour a l'accueil</h2>
        </div>
        
    )
}
export default PersonalInfo;