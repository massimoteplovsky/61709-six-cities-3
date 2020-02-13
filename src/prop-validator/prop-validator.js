import {
  arrayOf,
  string,
  number,
  func
} from 'prop-types';

export const OfferPropType = {
  OFFERS: arrayOf(string).isRequired,
  OFFERS_COUNT: number.isRequired,
  TITLE_CLICK: func.isRequired
};
