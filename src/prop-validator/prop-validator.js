import {
  arrayOf,
  string,
  exact,
  number,
  func,
  array
} from 'prop-types';

export const PropValidator = {
  OFFER: exact({
    id: number.isRequired,
    title: string.isRequired,
    img: string.isRequired,
    price: number.isRequired,
    type: string.isRequired,
    rating: number.isRequired,
    coordinates: array.isRequired
  })
};
