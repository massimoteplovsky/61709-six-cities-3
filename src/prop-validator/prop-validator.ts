export interface Offer {
    id: number,
    city: {
      name: string,
      location: {
        latitude: number,
        longitude: number,
        zoom: number
      }
    }
    previewImage: string,
    images: string[],
    title: string,
    isFavorite: boolean,
    isPremium: boolean,
    rating: number,
    type: string,
    bedrooms: number,
    maxAdults: number,
    price: number,
    goods: string[],
    host: {
      id: number,
      name: string,
      isPro: boolean,
      avatarUrl: string
    },
    description: string,
    location: {
      latitude: number,
      longitude: number,
      zoom: number
    }
}

export interface UserInfo {
  avatarUrl: string,
  email: string,
  id: number,
  isPro: boolean,
  name: string
}

export interface Review {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string
  }
}
