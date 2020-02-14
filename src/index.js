import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offers from './mocks/offers';

const offersCount = 5;

ReactDOM.render(
    <App
      offersCount={offersCount}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
