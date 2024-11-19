import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/flatpickr.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "react-toggle/style.css"; // for ES6 modules
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          // closeOnClick
          // rtl={false}
          // pauseOnFocusLoss
          // draggable
          // pauseOnHover
          // theme="light"
        />

        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

if('serviceWorker' in navigator){
window.addEventListener('load',()=>{
  navigator.serviceWorker.register('/')
  .then(registration =>{
console.log("Service worker registred ",registration.scope);
  }).catch(error=>{
    console.log('service worker registration faild',error);
  });
});
};

serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
