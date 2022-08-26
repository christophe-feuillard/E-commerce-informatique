import "./Commentaires.css";
// import TitreComment from "./TitreComment";
import { useState,useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comment from "./Comment";
import { GetGlobalData } from '../../useContext/AuthProviders';
// import { createContext, useContext, useState } from 'react';
// const ThemeContext = createContext(null);

const Commentaires = ({articleId}) => {

  const [comment,setComment] = useState("");
  const [comments,setComments] = useState([]);
  const [commentTitle,setCommentTitle] = useState("");
  const [commentsTitle,setCommentsTitle] = useState([]);
  const [databasecomment,setDatabasecomment] = useState([]);

  const [dataUser, setdataUser] = useState([]);
  const {contextToken} = GetGlobalData();
  const [token, setToken] = contextToken;
  const [formdata,setFormdata] = useState({
    user: "",
    message: "",
    articleid: "",
    username: "",
    date: moment().format("MMM Do YY"),
    comment_title: "",
  });
  const isBtnDisabled = comment.length === 0; 
  const isToken = token === null;
  const navigate = useNavigate();
  console.log(dataUser);
  useEffect(() => {
    const callAPI = async () => {
        await axios.get('http://localhost:8000/api/user/role', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
      axios.get('http://localhost:8000/api/comments')
        .then(res => {
          setDatabasecomment(res.data);
          console.log(databasecomment);
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();
  }, []);

  const onClickHandler = () => {
    setComments((comments) => [...comments, comment]);
    setCommentsTitle((commentsTitle) => [...commentsTitle, commentTitle]);
  }

  const onChangeHandlerTitle = (e) => {
    setCommentTitle(e.target.value);
  }

  const onChangeHandler = (e) => {
    setComment(e.target.value);
    const newdata = {...formdata};
    newdata["comment_title"] = commentTitle
    newdata["articleid"] = articleId
    newdata["user"] = dataUser.id
    newdata[e.target.id] = e.target.value;
    newdata["username"] = dataUser.name
    newdata["date"] = moment().format("MMM Do YY")
    setFormdata(newdata);
  }

  const onSubmit = (event) => {
    event.preventDefault(); 
    setComment("");
    setCommentTitle("");

    const data = {
      message: formdata.message,
      user: parseInt(formdata.user),  
      article: parseInt(formdata.articleid),
      username: formdata.username,
      date: moment().format("MMM Do YY"),
      comment_title: formdata.comment_title
    }
    var config = {
      method: 'post',
      url: "http://127.0.0.1:8000/api/avis/save",
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
     
      {/* GERER SI LE USER EST CONNECTé OU PAS */}
      <div className="separation"></div>
      <h4 className="h4" style={{ display: isToken === true ? "block" : "none" }}> <a onClick={()=> navigate("/login")} className="cotoi">Connecte-toi</a> pour pouvoir accéder aux avis</h4>
      <a onClick={()=> navigate("/register")} className="h4_p" style={{ display: isToken === true ? "block" : "none" }}>Pas encore inscrit ?</a>

      {/* FORMULAIRE D'ENVOI D'UN AVIS */}
      <div className="container_com_div">     
        <form onSubmit={onSubmit} style={{ display: isToken === true ? "none" : "flex" }} className="formCom">   

          <input id="articleid" type="hidden" value={articleId}/>
          <input id="username" type="hidden" value={dataUser.name}/>
          <input id="user" type="hidden" value={dataUser.id}/>

          <div className="textareadiv">

            <textarea
             placeholder="Titre de l'avis ..."
             id="commentTitle" 
             className="textarea"
             value={commentTitle} 
             onChange={(e) => onChangeHandlerTitle(e)}
            />

            <textarea
             placeholder="Laisser un avis ..."
             id="message" 
             className="textarea"
             value={comment} 
             onChange={(e) => onChangeHandler(e)}
            />

          </div>

          <button className="btn_avis" onClick={onClickHandler} disabled={isBtnDisabled}>Ajouter un avis</button>         
        </form>
      </div>

     {/* AFFICHE LES AVIS EN FRONT */}
      {comments.map((text) => (
        <Comment 
         commentId={dataUser.id}
         username={dataUser.name} 
         date={moment().format("MMM Do YY")} 
         text={text}
         commentTitle={commentsTitle}
        />         
      ))} 

      {/* RECUPERE LES AVIS DEPUIS LA BDD ET LES AFFICHENT EN FRONT */}
      {databasecomment.map((text) => (text.article === articleId &&
        <Comment 
         username={text.username} 
         date={text.date} 
         text={text.message}
         commentTitle={text.commentTitle}
        />         
      ))}
    </section>
    </>
  )
};

export default Commentaires;
