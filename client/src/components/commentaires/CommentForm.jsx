import { useState } from "react";
import "./Commentaires.css";

const CommentForm = ({handleSubmit,submitLabel,hasCancelButton = false,handleCancel,initialText = ""}) => {

  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const isToken = localStorage.getItem("token") === null; // si je suis pas connecté le bouton ne fonctionnera pas
  let placeholder = '';
  if(isToken) {
    let placeholderNew = 'Il faut être connecté pour pouvoir laisser un avis !';
    placeholder = placeholderNew;
  } 
  

  const onSubmit = (event) => {
    event.preventDefault(); // empeche le form de s'envoyer normalement
    handleSubmit(text);
    setText("");
  };

  return (
    <form className="formulaire-commentaires" onSubmit={onSubmit}>
      <textarea className="comment-form-textarea" value={text} placeholder={placeholder} onChange={(e) => setText(e.target.value)}/>
      <button className="comment-form-button" disabled={isToken || isTextareaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>     
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
