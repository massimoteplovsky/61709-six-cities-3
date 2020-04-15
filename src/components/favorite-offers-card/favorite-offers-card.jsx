import React from "react";
import {Link} from "react-router-dom";
import {makeRating} from "../../helpers.js";
import {changeOfferFavoriteStatus, changeActualCity} from "../../actions/action-creators/offers.js";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import history from "../../history.js";

const FavoriteOfferCard = ({
  cities,
  favoriteOffers,
  onChangeOfferFavoriteStatus,
  onChangeActualCity
}) => {
  return (
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <ul className="favorites__list">
          {
            cities.map((city, index) => {
              return (
                <li key={`${city}-${index}`} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a
                        className="locations__item-link"
                        onClick={(event) => {
                          event.preventDefault();
                          onChangeActualCity(city);
                          history.push(`/`);
                        }}
                      >
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {
                      favoriteOffers.map(({
                        id,
                        previewImage,
                        price,
                        isFavorite,
                        rating,
                        title,
                        type,
                        city: {
                          name: cityName
                        }
                      }, offerIndex) => {
                        if (cityName === city) {
                          return (
                            <article key={offerIndex} className="favorites__card place-card">
                              <div className="favorites__image-wrapper place-card__image-wrapper">
                                <Link to={`/offer/${id}`}>
                                  <img
                                    className="place-card__image"
                                    src={previewImage}
                                    width="150"
                                    height="110"
                                    alt="Place image"
                                  />
                                </Link>
                              </div>
                              <div className="favorites__card-info place-card__info">
                                <div className="place-card__price-wrapper">
                                  <div className="place-card__price">
                                    <b className="place-card__price-value">&euro;{price}</b>
                                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                                  </div>
                                  <button
                                    className={`place-card__bookmark-button ${isFavorite ? `place-card__bookmark-button--active` : ``} button`}
                                    type="button"
                                    onClick={() => onChangeOfferFavoriteStatus(id, isFavorite ? 0 : 1)}
                                  >
                                    <svg className="place-card__bookmark-icon" width="18" height="19">
                                      <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">In bookmarks</span>
                                  </button>
                                </div>
                                <div className="place-card__rating rating">
                                  <div className="place-card__stars rating__stars">
                                    <span style={{width: `${makeRating(rating)}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                  </div>
                                </div>
                                <h2
                                  className="place-card__name"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    history.push(`/offer/${id}`);
                                  }}
                                >
                                  <a href="#">{title}</a>
                                </h2>
                                <p className="place-card__type">{type}</p>
                              </div>
                            </article>
                          );
                        }

                        return null;

                      })
                    }

                  </div>
                </li>
              );
            })
          }
        </ul>
      </section>
    </div>
  );
};

FavoriteOfferCard.propTypes = {
  cities: PropTypes.array.isRequired,
  favoriteOffers: PropTypes.array.isRequired,
  onChangeOfferFavoriteStatus: PropTypes.func.isRequired,
  onChangeActualCity: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onChangeOfferFavoriteStatus(offerID, status) {
    dispatch(changeOfferFavoriteStatus(offerID, status));
  },
  onChangeActualCity(city) {
    dispatch(changeActualCity(city));
  }
});

export default connect(null, mapDispatchToProps)(FavoriteOfferCard);
