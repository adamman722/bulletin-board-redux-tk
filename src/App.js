import "./App.css";
import PostList from "./components/post/PostList";
import AddPostForm from "./components/post/addPostForm";
import SinglePostPage from "./components/post/SinglePostPage";
import EditPostForm from "./components/post/EditPostForm";
import Layout from "./layout Dir/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />}></Route>

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
