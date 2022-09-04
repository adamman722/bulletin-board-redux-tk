import React from "react";
import { useSelector } from "react-redux";

import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from "../../features/slices/post/postsSlice";
import PostExcerpt from "./PostExcerpt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function PostsList() {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

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

  return <section className="post-section">{content}</section>;
}

export default PostsList;
