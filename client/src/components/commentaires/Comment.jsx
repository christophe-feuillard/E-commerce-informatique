import CommentForm from "./CommentForm";
import "./Commentaires.css";
import imgProfil from "../../asset/user-icon.png"
import { useState,useEffect } from "react";
import axios from 'axios';

const Comment = ({nameUser,comment,replies,setActiveComment,activeComment,updateComment,deleteComment,addComment,parentId = null,currentUserId,}) => {
  
  const isEditing = activeComment && activeComment.id === comment.id && activeComment.type === "editing";
  const isReplying = activeComment && activeComment.id === comment.id && activeComment.type === "replying";
  const fiveMinutes = 300000; // 5 minutes , apres c'est plus possible d'édit le com
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const [dataUser, setdataUser] = useState([]);
  const Token = localStorage.getItem("token");

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
            console.log(res.data);
        })
        .catch(err => {
        console.log(err);
        });
    }
    callAPI();
  }, []);

  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={imgProfil} alt="photodeprofil"/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{dataUser.name}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => { setActiveComment(null); }}
          />
        )}

        <div className="comment-actions">
          {canReply && (
            <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "replying" })}>                                           
              Reply
            </div>
          )}
          {canEdit && (
            <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: "editing" })}>
              Edit
            </div>
          )}
          {canDelete && (
            <div className="comment-action" onClick={() => deleteComment(comment.id)}>
              Delete
            </div>
          )}
        </div>

        {isReplying && (
          <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Comment;
