import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const offersCount = 5;

ReactDOM.render(
    <App
      offersCount={offersCount}
    />,
    document.querySelector(`#root`)
);
