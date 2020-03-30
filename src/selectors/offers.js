import {createSelector} from "reselect";

export const getActualCity = (state) => {
  return state.offers.actualCity;
};

export const getAllOffers = (state) => {
  return state.offers.offers;
};

export const getOfferReviews = (state) => {
  return state.offers.reviews;
};

export const getNeighbourPlaces = (state) => {
  return state.offers.places;
}

export const getOffer = (state, offerID) => {
  const offers = state.offers.offers;
  return offers.find((offer) => offer.id === Number(offerID));
};

export const getOffersByCity = createSelector(
    getAllOffers,
    getActualCity,
    (offers, city) => {
      return offers.filter((offer) => offer.city.name === city);
    }
);


