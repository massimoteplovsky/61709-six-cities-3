import React from 'react';
import renderer from 'react-test-renderer';
import {offers, offersCount} from '../../mocks/offers-test';
import Main from './main.jsx';

const handleTitleClick = () => {};

it(`<Main /> component renders correctly`, () => {
  const tree = renderer
    .create(<Main
      offers={offers}
      offersCount={offersCount}
      onTitleClick={handleTitleClick}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
