import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Commentaires.css";
import { getComments as getCommentsApi, createComment as createCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi,} from "./api";

const Comments = ({ commentsUrl, currentUserId }) => {

  const [backendComments, setBackendComments] = useState([]); // quand on voudra stocker les comm dans le back
  const [activeComment, setActiveComment] = useState(null);
  console.log(backendComments);

  const rootComments = backendComments.filter( // je filtre pour avoir uniquement les commentaires root
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
     backendComments.filter((backendComment) => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
     
  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };


  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => { // jfais la requete a mon api.js
    getCommentsApi().then((data) => {
      setBackendComments(data);
      // console.log(setBackendComments(data));
    });
  }, []); // je savais pas mais le "[]" signifie que le useEffect() s'éxecutera qu'une seule fois

  return (
    <div className="comments">
      <h3 className="comments-title">Commentaires</h3>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
