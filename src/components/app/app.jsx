import React from 'react';
import {OfferPropType} from '../../prop-validator/prop-validator';
import Main from '../main/main.jsx';

const App = ({offersCount, offers}) => {
  return (
    <Main
      offersCount={offersCount}
      offers={offers}
    />
  );
};

App.propTypes = {
  offers: OfferPropType.OFFERS,
  offersCount: OfferPropType.OFFERS_COUNT
};

export default App;
