import {
  CHANGE_ACTUAL_CITY,
  LOAD_ALL_OFFERS,
  LOAD_REVIEWS,
  LOAD_NEIGHBOUR_PLACES,
  CHANGE_ACTUAL_OFFER,
  CHANGE_ACTUAL_FILTER,
  CHANGE_OFFER_FAVORITE_STATUS,
  LOAD_FAVORITE_OFFERS,
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  ADD_REVIEWS
} from "../../actions/type/offers.js";

const initialState = {
  actualCity: ``,
  actualFilter: `Popular`,
  actualOffer: -1,
  offers: [],
  favoriteOffers: [],
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
    case CHANGE_ACTUAL_FILTER:
      return Object.assign(
          {},
          state,
          {actualFilter: payload}
      );
    case LOAD_FAVORITE_OFFERS:
      return Object.assign(
          {},
          state,
          {favoriteOffers: payload}
      );
    case CHANGE_ACTUAL_OFFER:
      return Object.assign(
          {},
          state,
          {actualOffer: payload}
      );
    case LOAD_ALL_OFFERS:
      return Object.assign(
          {},
          state,
          {offers: payload}
      );
    case LOAD_REVIEWS:
    case ADD_REVIEWS:
      return Object.assign(
          {},
          state,
          {reviews: payload}
      );
    case LOAD_NEIGHBOUR_PLACES:
      return Object.assign(
          {},
          state,
          {places: payload}
      );
    case CHANGE_OFFER_FAVORITE_STATUS:
      const {
        offer,
        offerIndex,
        placeIndex
      } = payload;

      return Object.assign(
          {},
          state,
          {
            offers: [
              ...state.offers.slice(0, offerIndex),
              offer,
              ...state.offers.slice(offerIndex + 1)
            ],
            places: placeIndex !== -1 ?
              [
                ...state.places.slice(0, placeIndex),
                offer,
                ...state.places.slice(placeIndex + 1)
              ]
              :
              state.places
          }
      );
    case ADD_TO_FAVORITES:
      return Object.assign(
          {},
          state,
          {favoriteOffers: [...state.favoriteOffers, payload]}
      );
    case DELETE_FROM_FAVORITES:
      const newFavoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== payload.id);
      return Object.assign(
          {},
          state,
          {favoriteOffers: newFavoriteOffers}
      );
    default:
      return state;
  }
};

