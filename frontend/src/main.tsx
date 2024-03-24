import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { store } from "./Redux/store";
import client from "./apollo/client";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </ApolloProvider>
    </React.StrictMode>
  </Provider>
);
