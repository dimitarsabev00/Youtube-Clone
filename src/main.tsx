import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";

const rootElement = document.getElementById("root");

// Check if the root element is available before rendering
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // Use createRoot if you want to enable concurrent rendering in React 18
  root.render(
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
} else {
  console.error('Root element with id "root" not found in the document.');
}
