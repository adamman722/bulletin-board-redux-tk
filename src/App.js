import "./App.css";
import PostList from "./components/post/PostList";
import AddPostForm from "./components/post/addPostForm";
function App() {
  return (
    <main className="App">
      <AddPostForm />
      <PostList />
    </main>
  );
}

export default App;
