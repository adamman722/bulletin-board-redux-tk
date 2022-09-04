import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../../features/slices/post/postsSlice";
import PostExcerpt from "./PostExcerpt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function PostsList() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  //we are sorting the posts with localeCompare that returns a 1 0 -1 from our dates to see which is the earliest in the array then making a shallow copy with slice

  //we are just checking the status to determine the components
  let content;
  if (postStatus === "loading...") {
    content = <FontAwesomeIcon icon={faSpinner} size="5x" spin />;
  } else if (postStatus === "Succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Posts</h2>
      <section className="post-section">{content}</section>
    </section>
  );
}

export default PostsList;
