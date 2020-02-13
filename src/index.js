import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const offersCount = 5;
const offers = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`];

ReactDOM.render(
    <App
      offersCount={offersCount}
      offers={offers}
    />,
    document.querySelector(`#root`)
);
