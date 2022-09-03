import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../../features/slices/post/postsSlice";
//nanoid helps us create a random id so we don't have to worry about creating one
import { nanoid } from "@reduxjs/toolkit";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const dispatch = useDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        //the benefit of doing it this way is that the component does not need to know the setup of the slice but just take in the raw data
        postAdded(title, content)
        // postAdded({
        //   id: nanoid(),
        //   title,
        //   content,
        // })
      );
      setTitle("");
      setContent("");
    }
  };

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
        >
          Save Post
        </button>
      </form>
    </section>
  );
}

export default AddPostForm;
