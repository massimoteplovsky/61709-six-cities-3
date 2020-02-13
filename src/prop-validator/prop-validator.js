import {
  arrayOf,
  string,
  number
} from 'prop-types';

export const OfferPropType = {
  OFFERS: arrayOf(string).isRequired,
  OFFERS_COUNT: number.isRequired
};
