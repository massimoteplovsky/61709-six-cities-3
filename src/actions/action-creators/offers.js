import {
  CHANGE_ACTUAL_CITY,
  GET_CITY_OFFERS,
  ADD_REVIEWS,
  ADD_NEIGHBOUR_PLACES,
  CHANGE_ACTUAL_OFFER,
  CHANGE_ACTUAL_FILTER
} from "../type/offers";
import {makeCityList} from "../../helpers";

export const changeActualCity = (city) => ({
  type: CHANGE_ACTUAL_CITY,
  payload: city
});

const saveOffersToState = (offers) => ({
  type: GET_CITY_OFFERS,
  payload: offers
});

const saveOfferReviewsToState = (reviews) => ({
  type: ADD_REVIEWS,
  payload: reviews
});

const saveNeighbourPlacesToState = (places) => ({
  type: ADD_NEIGHBOUR_PLACES,
  payload: places
});

export const changeActualFilter = (filter) => ({
  type: CHANGE_ACTUAL_FILTER,
  payload: filter
});

export const changeActualOffer = (id) => ({
  type: CHANGE_ACTUAL_OFFER,
  payload: id
});

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

export const loadNeighbourPlaces = (offerID) => (dispatch, _, api) => {
  return api.get(`/hotels/${offerID}/nearby`)
  .then((res) => {
    dispatch(saveNeighbourPlacesToState(res.data));
  });
};
