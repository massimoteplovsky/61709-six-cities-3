import React from "react";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";

const NotFound = () => {
  return (
    <div className="page">
      <Header/>
      <div
        style={{
          paddingTop: `100px`,
          paddingBottom: `100px`,
          textAlign: `center`
        }}
        className="container"
      >
        <p style={{
          fontSize: `100px`,
          fontWeight: `bold`,
          marginBottom: `0`
        }}>
          404
        </p>
        <p style={{
          fontSize: `40px`,
          fontWeight: `bold`,
          marginBottom: `20px`
        }}
        >Sorry, page not found!</p>
      </div>
      <Footer/>
    </div>
  );
};

export default NotFound;
