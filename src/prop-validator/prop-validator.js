import {
  arrayOf,
  string,
  exact,
  number,
  func
} from 'prop-types';

export const OfferPropType = {
  OFFER: exact({
    id: number.isRequired,
    title: string.isRequired,
    img: string.isRequired,
    price: number.isRequired,
    type: string.isRequired,
    rating: number.isRequired
  }),
  OFFERS: arrayOf(
      exact({
        id: number.isRequired,
        title: string.isRequired,
        img: string.isRequired,
        price: number.isRequired,
        type: string.isRequired,
        rating: number.isRequired
      })
  ).isRequired,
  OFFERS_COUNT: number.isRequired,
  TITLE_CLICK: func.isRequired,
  MOUSE_ENTER: func.isRequired,
  ACTIVE_OFFER: number.isRequired
};
