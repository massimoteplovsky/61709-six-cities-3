import {
  arrayOf,
  string,
  exact,
  number,
  shape,
  bool,
  oneOfType,
  oneOf
} from 'prop-types';

export const PropValidator = {
  OFFER: oneOfType([
    exact({
      id: number.isRequired,
      city: shape({
        name: string.isRequired,
        location: shape({
          latitude: number.isRequired,
          longitude: number.isRequired,
          zoom: number.isRequired
        })
      }).isRequired,
      previewImage: string.isRequired,
      images: arrayOf(string).isRequired,
      title: string.isRequired,
      isFavorite: bool.isRequired,
      isPremium: bool.isRequired,
      rating: number.isRequired,
      type: string.isRequired,
      bedrooms: number.isRequired,
      maxAdults: number.isRequired,
      price: number.isRequired,
      goods: arrayOf(string),
      host: shape({
        id: number.isRequired,
        name: string.isRequired,
        isPro: bool.isRequired,
        avatarUrl: string.isRequired
      }),
      description: string.isRequired,
      location: shape({
        latitude: number.isRequired,
        longitude: number.isRequired,
        zoom: number.isRequired
      })
    }).isRequired, oneOf([null])]),
  REVIEW: exact({
    comment: string.isRequired,
    date: string.isRequired,
    id: number.isRequired,
    rating: number.isRequired,
    user: shape({
      avatarUrl: string.isRequired,
      id: number.isRequired,
      isPro: bool.isRequired,
      name: string.isRequired
    }).isRequired
  }),
  USER_INFO: exact({
    avatarUrl: string.isRequired,
    email: string.isRequired,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired
  })
};
