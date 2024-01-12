import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={3} messages={["poor", "good", "cool!"]} />
  </React.StrictMode>
);

/*

      Prop drilling -> passing props in nested manner
  
*/
