import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../features/slices/post/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionsButton from "./ReactionsButton";

function PostsList() {
  const posts = useSelector(selectAllPosts);
  console.log(posts);

  //we are sorting the posts with localeCompare that returns a 1 0 -1 from our dates to see which is the earliest in the array then making a shallow copy with slice

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="post-credit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  ));
  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}

export default PostsList;
