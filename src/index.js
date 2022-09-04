import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./features/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/slices/users/userSlice";
import { fetchPosts } from "./features/slices/post/postsSlice";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* using the "/*" will allow for nested routes later on */}
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
