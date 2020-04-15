import {createSelector} from "reselect";

export const getActualCity = (state) => {
  return state.offers.actualCity;
};

export const getAllOffers = (state) => {
  return state.offers.offers;
};

export const getFavoriteOffers = (state) => {
  return state.offers.favoriteOffers;
};

export const getOfferReviews = (state) => {
  return state.offers.reviews;
};

export const getNeighbourPlaces = (state) => {
  return state.offers.places;
};

export const getActualFilter = (state) => {
  return state.offers.actualFilter;
};

export const getOffer = (state, offerID) => {
  const offer = state.offers.offers.find((offerItem) => offerItem.id === Number(offerID));
  if (!offer) {
    return null;
  }
  return offer;
};

const sortByFilter = (offers, filter) => {
  return offers.sort((a, b) => {
    switch (filter) {
      case `Price: low to high`:
        return a.price - b.price;
      case `Price: high to low`:
        return b.price - a.price;
      case `Top rated first`:
        return b.rating - a.rating;
      default:
        return offers;
    }
  });
};

export const getOffersByCity = createSelector(
    getAllOffers,
    getActualCity,
    getActualFilter,
    (offers, city, filter) => {
      return sortByFilter(offers.filter((offer) => offer.city.name === city), filter);
    }
);


