import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./features/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/slices/users/userSlice";

//when we want something to load as soon as the app starts we can call the dispatch at the highest level
//idk if this is best practice
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // strict mode makes the app render twice "This happens is an intentional feature of the React.StrictMode. It only happens in development mode and should help to find accidental side effects in the render phase.""
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
