import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {offers, offersCount} from '../../mocks/offers-test';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const handleClick = jest.fn((...args) => [...args]);

it(`Title has been clicked`, () => {

  const movieCard = shallow(
      <Main
        offers={offers}
        offersCount={offersCount}
        onTitleClick={handleClick}
      />
  );

  const titles = movieCard.find(`h2.place-card__name`);

  titles.forEach((title) => title.simulate(`click`));

  expect(handleClick.mock.calls.length).toBe(offers.length);
});

// it(`Movie data has been passed to the callback handler`, () => {

//   const movieCard = shallow(
//       <MovieCard
//         film={film}
//         onMouseEnter={handleMouseEnter}
//         onTitleClick={handleClick}
//       />
//   );

//   const card = movieCard.find(`.small-movie-card`);

//   card.simulate(`mouseenter`);
//   expect(handleMouseEnter.mock.calls.length).toBe(1);
//   expect(handleMouseEnter).toHaveBeenCalledWith(1);
// });
