import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../../features/slices/post/postsSlice";
import { selectAllUsers } from "../../features/slices/users/userSlice";
import { useNavigate, useParams } from "react-router-dom";
//nanoid helps us create a random id so we don't have to worry about creating one

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        //unwrap returns a  new promise that has the payload or a reject payload hence to use the tryCatch
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log("Failed to save boiii", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="add-post-section">
      <h2>Add a new Post</h2>
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
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
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
      </form>
    </section>
  );
}

export default AddPostForm;
