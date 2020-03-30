import {
  CHANGE_ACTUAL_CITY,
  GET_CITY_OFFERS,
  ADD_REVIEWS,
  ADD_NEIGHBOUR_PLACES,
  CHANGE_ACTUAL_OFFER
} from "../../actions/type/offers.js";

const initialState = {
  actualCity: ``,
  actualOffer: -1,
  offers: [],
  reviews: [],
  places: []
};

export const offers = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_ACTUAL_CITY:
      return Object.assign(
          {},
          state,
          {actualCity: payload}
      );
    case CHANGE_ACTUAL_OFFER:
      return Object.assign(
          {},
          state,
          {actualOffer: payload}
      );
    case GET_CITY_OFFERS:
      return Object.assign(
          {},
          state,
          {offers: payload}
      );
    case ADD_REVIEWS:
      return Object.assign(
          {},
          state,
          {reviews: payload}
      );
    case ADD_NEIGHBOUR_PLACES:
      return Object.assign(
          {},
          state,
          {places: payload}
      );
    default:
      return state;
  }
};

