import {
  arrayOf,
  string,
  exact,
  number,
  func
} from 'prop-types';

const OfferPropType = {
  OFFER: exact({
    id: number.isRequired,
    title: string.isRequired,
    img: string.isRequired,
    price: number.isRequired,
    type: string.isRequired,
    rating: number.isRequired
  }),
  OFFERS_COUNT: number.isRequired,
  TITLE_CLICK: func.isRequired,
  MOUSE_ENTER: func.isRequired,
  ACTIVE_OFFER: number.isRequired
};

export const PropTypes = {
  OFFER_PROPTYPE: Object.assign(
      OfferPropType,
      {OFFERS: arrayOf(OfferPropType.OFFER).isRequired}
  )
};
