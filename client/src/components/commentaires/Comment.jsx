import "./Commentaires.css";

const Comment = ({imgProfil,username,date,text}) => {
  
  return (
    <>
      <div className="container_com_div ccd2">
        <div className="commentaire_div"> 
          <div>
           <img className="img_profil_com" src={imgProfil} alt="profil"/>
          </div>
          <div>
            <div>
             <span className="username_com">{username}</span> 
             <span className="time_com">{date}</span> 
            </div>
            <div>
              <p>
                {text}
              </p>             
            </div>
          </div>
        </div>  
      </div>        
    </>
  ) 
};

export default Comment;
