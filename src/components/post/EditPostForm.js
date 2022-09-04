import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../../features/slices/post/postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../../features/slices/users/userSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2> Post not found!</h2>
      </section>
    );
  }

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reaction: post.reaction,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to seave the post", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate(`/`);
    } catch (error) {
      console.error("Failed to delte the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  console.log(userOptions);
  return (
    <section>
      <h2>Edit Post</h2>
      <form className="add-post-form">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onAuthorChange}>
          <option value=" "></option>
          {userOptions}
        </select>

        <label htmlFor="postContent" className="content-label">
          Content:
        </label>
        <textarea
          type="text"
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          className="save-post-button"
          disabled={!canSave}
        >
          Save Post
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
