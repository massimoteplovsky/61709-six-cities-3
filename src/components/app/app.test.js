import React from 'react';
import renderer from 'react-test-renderer';
import {offers, offersCount} from '../../mocks/offers-test';
import App from './app.jsx';

it(`<App /> component renders correctly`, () => {
  const tree = renderer
    .create(<App
      offers={offers}
      offersCount={offersCount}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
