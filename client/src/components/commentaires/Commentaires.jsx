import "./Commentaires.css";
import imgProfil from "../../asset/user-icon.png";
import { useState,useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comment from "./Comment";

const Commentaires = ({articleId}) => {
  
  const [comment,setComment] = useState("");
  const [comments,setComments] = useState([]);
  const isBtnDisabled = comment.length === 0; 
  const [dataUser, setdataUser] = useState([]);
  const Token = localStorage.getItem("token");
  const isToken = localStorage.getItem("token") === null;
  const navigate = useNavigate();
  const [databasecomment,setDatabasecomment] = useState([]);

  const [formdata,setFormdata] = useState({
    userid: "",
    message: "",
    articleid: "",
    username: "",
    date: moment().format("MMM Do YY")
  });

  useEffect(() => {
    const callAPI = async () => {
        await axios.get('http://localhost:8000/api/user/role', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`
            },
        })
        .then(res => {
            setdataUser(res.data);
        })
        .catch(err => {
        console.log(err);
        });
    }
    callAPI();
  }, []);

  useEffect(() => {
    const callAPI = () => {
      axios.get('http://127.0.0.1:8000/api/comments')
        .then(res => {
          setDatabasecomment(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();
  }, []);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
  }

  const onChangeHandler = (e) => {
    setComment(e.target.value);

    const newdata = {...formdata};
    newdata["articleid"] = articleId
    newdata["userid"] = dataUser.id
    newdata[e.target.id] = e.target.value;
    newdata["username"] = dataUser.name
    newdata["date"] = moment().format("MMM Do YY")
    setFormdata(newdata);
  }

  const onSubmit = (event) => {
    event.preventDefault(); 
    setComment("");

    const data = {
      message: formdata.message,
      user: parseInt(formdata.userid),  
      article: parseInt(formdata.articleid),
      username: formdata.username,
      date: moment().format("MMM Do YY")
    }
    var config = {
      method: 'post',
      url: "http://127.0.0.1:8000/api/avis/save",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`
      }, 
      data : data
    }
    axios(config).then(res => {
      console.log(res.data)
    })
  };

  return (
    <>
    <section className="section_com">

      <div className="separation"></div>
      <h4 className="h4" style={{ display: isToken === true ? "block" : "none" }}> <a onClick={()=> navigate("/login")} className="cotoi">Connecte-toi</a> pour pouvoir accéder aux avis</h4>
      <a onClick={()=> navigate("/register")} className="h4_p" style={{ display: isToken === true ? "block" : "none" }}>Pas encore inscrit ?</a>

      <div className="container_com_div">

        <form onSubmit={onSubmit} style={{ display: isToken === true ? "none" : "flex" }} className="formCom">   
          <input id="articleid" type="hidden" value={articleId}/>
          <input id="username" type="hidden" value={dataUser.name}/>
          <input id="userid" type="hidden" value={dataUser.id}/>
          <div className="img_profil_form">
            <img className="img_profil_com" src={imgProfil} alt="profil"/>
          </div>
          <textarea
            placeholder="Laisser un avis"
            id="message" 
            className="textarea"
            value={comment} 
            onChange={(e) => onChangeHandler(e)}
          />
          <button className="btn_avis" onClick={onClickHandler} disabled={isBtnDisabled}>Ajouter un avis</button>         
        </form>

      </div>

      {comments.map((text) => (
        <Comment 
         imgProfil={imgProfil} 
         username={dataUser.name} 
         date={moment().format("MMM Do YY")} 
         text={text}
        />    
      ))} 

      {databasecomment.map((text) => ( text.article === articleId &&
        <Comment 
         imgProfil={imgProfil} 
         username={text.username} 
         date={text.date} 
         text={text.message}
        />         
      ))}   

    </section>
    </>
  )
    
};

export default Commentaires;
