import React from 'react';
import {OfferPropType} from '../../prop-validator/prop-validator';
import Main from '../main/main.jsx';

const handleTitleClick = (event) => {
  event.preventDefault();
  console.log(`clicked`);
};

const App = ({offersCount, offers}) => {
  return (
    <Main
      offersCount={offersCount}
      offers={offers}
      onTitleClick={handleTitleClick}
    />
  );
};

App.propTypes = {
  offers: OfferPropType.OFFERS,
  offersCount: OfferPropType.OFFERS_COUNT
};

export default App;
