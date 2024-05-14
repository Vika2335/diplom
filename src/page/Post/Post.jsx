import React, { useState } from "react"
import "./Post.css"
import { 
  useParams, 
  useNavigate 
} from "react-router-dom"
import { 
  useChangePostDataMutation, 
  useGetOnePostQuery 
} from "../../redux/postsApi"
import { useLikePostMutation } from "../../redux/likePost"
import comment from "../../image/icons/comment.svg"
import eye from "../../image/icons/eye.svg"
import heart from "../../image/icons/heart.svg"
import datetime from "../../image/icons/datetime.svg"
import { format } from "date-fns"
import Comment from "../../components/Comment/Comment"
import edit from '../../image/icons/edit.svg'
import { 
  useSelector, 
  useDispatch  
} from 'react-redux';
import { FaRegSave } from "react-icons/fa";
import { updatePost } from "../../redux/postSlice"

function Post() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams()
  const { data: post, isLoading } = useGetOnePostQuery(id);
  console.log(post);

  const selectedPost = useSelector((state) => state.post);

  const [likedCount, setLikedCount] = useState(0);

  const navigate = useNavigate()

  const backButton = () => {
    navigate("/")
  }

  const [likedPost] = useLikePostMutation();

  const handleLike = async () => {
    try {
      const likesOnPost = await likedPost(id)
      if (likesOnPost) {
        console.log(likesOnPost)
        setLikedCount(likesOnPost.data.likes.length)
      }
    } catch (error) {
      console.error("Ошибка при лайке поста:", error)
    }
  }

  const [editedHeader, setEditedHeader] = useState(selectedPost.header);
  const [editedBody, setEditedBody] = useState(selectedPost.body);
  const [editedTags, setEditedTags] = useState(selectedPost.tags);
  const [isEditing, setIsEditing] = useState(false);

  const [ changePost ] = useChangePostDataMutation();

  const saveChangesPost = async(e) => {
    e.preventDefault();
    try {
      let newHeader = undefined;
      let newBody = undefined;
      let newTags = undefined;

      if(post.header != editedHeader){
        newHeader = editedHeader
      }

      if(post.body != editedBody){
        newBody = editedBody
      }
      if(post.tags != editedTags){
        newTags = editedTags
      }

      console.log(post._id);


      const test = await changePost({ header: newHeader, body: newBody, tags: newTags , id: post._id});
      console.log(test)
      
      setIsEditing(false);
      dispatch(updatePost({ header: editedHeader, body: editedBody, tags: editedTags }));
    } catch (error) {
      console.error('Ошибка при изменении данных поста:', error);
    }
  }

  return isLoading ? (
    <h1 className='load'>Loading...</h1>
  ) : (
    <>
      <main onLoad={() => setLikedCount(post.likes.length)}>
        <section>
          <div className="container">
            <div className="posts">
              <div className="post-content">
                <div className="button__back">
                  <button className="back" onClick={backButton}>
                    &lt;&lt;
                  </button>
                </div>
                <div className="post__name">
                  {user.roles?.includes('ADMIN') ? (
                    <div className="block-edit">
                      {!isEditing ? (
                        <h2 className="post__title">{post.header}</h2>
                      ) : (
                        <input
                          type="text"
                          value={editedHeader}
                          onChange={(e) => setEditedHeader(e.target.value)}
                          className="edit-header"
                          placeholder="Название"
                        />
                      )}
                      {!isEditing ? (
                        <button className='edit-img' onClick={() => setIsEditing(!isEditing)}>
                          <img src={edit} alt='No icon'/>
                        </button>
                      ) : (
                        <button className='save-button' onClick={saveChangesPost}>
                          <FaRegSave className='save' />
                        </button>
                      )}
                    </div>
                  ) : (
                    <h2 className='post__title'>{post.header}</h2>
                  )}
                  {!isEditing ? (
                    <p className="post__description">{post.body}</p>
                  ) : (
                    <textarea
                      type="text"
                      value={editedBody}
                      onChange={(e) => setEditedBody(e.target.value)}
                      className="edit-body"
                      placeholder="Текст"
                    />
                  )}
                  <div className="information__post">
                    <div className="post__content">
                      <div className="views">
                        <p className="view__int">{post.viewCount}</p>
                        <img src={eye} alt="No image" />
                      </div>
                      <div className="comment">
                        <p className="int">{post.comments.length}</p>
                        <img src={comment} alt="No image" />
                      </div>
                      <div className="hearts">
                        <p className="int">{likedCount}</p>
                        <button className="button-heart" onClick={handleLike}>
                          <img src={heart} alt="No image" />
                        </button>
                      </div>
                      <div className="post__tags">
                      {!isEditing ? (
                        <p className="tag">{post.tags}</p>
                      ) : (
                        <input
                          type="text"
                          value={editedTags}
                          onChange={(e) => setEditedTags(e.target.value)}
                          className="edit-tags"
                          placeholder="Теги"
                        />
                      )}
                      </div>
                    </div>
                    <div className="datetime">
                      <p className="date">
                        {format(new Date(post.createdAt), "dd.MM.yyyy")}
                      </p>
                      <img src={datetime} alt="No image" />
                    </div>
                  </div>
                </div>
              </div>
              <Comment postId={id}/>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Post