import React from 'react';
import Main from '../main/main.jsx';

// eslint-disable-next-line react/prop-types
const App = ({offersCount}) => {
  return (
    <Main
      offersCount={offersCount}
    />
  );
};

export default App;
