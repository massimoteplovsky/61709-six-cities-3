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
} from "../type/offers";
import {makeCityList} from "../../helpers";
import {OfferStatus} from "../../consts.js";

export const changeActualCity = (city) => ({
  type: CHANGE_ACTUAL_CITY,
  payload: city
});

const saveOffersToState = (offers) => ({
  type: LOAD_ALL_OFFERS,
  payload: offers
});

const saveOfferReviewsToState = (reviews) => ({
  type: LOAD_REVIEWS,
  payload: reviews
});

const saveNeighbourPlacesToState = (places) => ({
  type: LOAD_NEIGHBOUR_PLACES,
  payload: places
});

const saveFavoriteOffersToState = (favoriteOffers) => ({
  type: LOAD_FAVORITE_OFFERS,
  payload: favoriteOffers
});

export const changeActualFilter = (filter) => ({
  type: CHANGE_ACTUAL_FILTER,
  payload: filter
});

export const changeActualOffer = (id) => ({
  type: CHANGE_ACTUAL_OFFER,
  payload: id
});

const changeOfferFavoriteStatusToState = (offer, offerIndex, placeIndex) => ({
  type: CHANGE_OFFER_FAVORITE_STATUS,
  payload: {
    offer,
    offerIndex,
    placeIndex
  }
});

const addOfferToFavoriteList = (offer) => ({
  type: ADD_TO_FAVORITES,
  payload: offer
});

const deleteOfferFromFavotiteList = (offer) => ({
  type: DELETE_FROM_FAVORITES,
  payload: offer
});

const saveReviewToState = (reviews) => ({
  type: ADD_REVIEWS,
  payload: reviews
});

const findOfferIndex = (state, type, offerID) => {
  return state().offers[type].findIndex((offer) => offer.id === offerID);
};

export const changeOfferFavoriteStatus = (offerID, status) => (dispatch, getState, api) => {
  return api.post(`/favorite/${offerID}/${status}`)
  .then((res) => {
    if (res.status === 200) {
      const offerIndex = findOfferIndex(getState, `offers`, offerID);
      const placeIndex = findOfferIndex(getState, `places`, offerID);

      dispatch(changeOfferFavoriteStatusToState(res.data, offerIndex, placeIndex));

      if (status === OfferStatus.ADD) {
        dispatch(addOfferToFavoriteList(res.data));
      }

      if (status === OfferStatus.DELETE) {
        dispatch(deleteOfferFromFavotiteList(res.data));
      }
    }
  });
};

export const loadFavoriteOffers = () => (dispatch, _, api) => {
  return api.get(`/favorite`)
  .then((res) => {
    dispatch(saveFavoriteOffersToState(res.data));
  });
};

export const loadAllOffers = () => (dispatch, _, api) => {
  return api.get(`/hotels`)
  .then((res) => {
    dispatch(saveOffersToState(res.data));
    dispatch(changeActualCity(makeCityList(res.data)[0]));
  });
};

export const loadOfferReviews = (offerID) => (dispatch, _, api) => {
  return api.get(`/comments/${offerID}`)
  .then((res) => {
    dispatch(saveOfferReviewsToState(res.data));
  });
};

export const sendReview = (offerID, reviewData, clearFields) => (dispatch, _, api) => {
  return api.post(`/comments/${offerID}`, reviewData)
  .then((res) => {
    dispatch(saveReviewToState(res.data));
    clearFields();
  });
};

export const loadNeighbourPlaces = (offerID) => (dispatch, _, api) => {
  return api.get(`/hotels/${offerID}/nearby`)
  .then((res) => {
    dispatch(saveNeighbourPlacesToState(res.data));
  });
};
