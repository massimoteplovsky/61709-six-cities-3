import React from "react";

const Loading = () => {
  return (
    <div style={{
      display: `flex`,
      flexFlow: `column`,
      justifyContent: `center`,
      alignItems: `center`,
      width: `100%`,
      height: `100%`
    }}>
      <img
        className="header__logo"
        src="../img/logo.svg"
        alt="6 cities logo"
        width="101"
        height="61"
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
