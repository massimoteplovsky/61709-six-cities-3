import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import {makeRating} from '../../helpers';
import {connect} from "react-redux";
import {changeActualOffer, changeOfferFavoriteStatus} from "../../actions/action-creators/offers.js";

const OfferCard = ({
  offer,
  activeIndex,
  onChangeActiveItem,
  onChangeActualOffer,
  isNeighbourMode,
  onChangeOfferFavoriteStatus
}) => {
  const {
    id,
    title,
    isPremium,
    previewImage,
    price,
    rating,
    type,
    isFavorite
  } = offer;

  const handleChangeActualOffer = (offerID) => {
    if (!isNeighbourMode) {
      onChangeActualOffer(offerID);
    }
  };

  return (
    <article
      className={`cities__place-card place-card ${activeIndex === id ? `active` : ``}`}
      onMouseEnter={() => {
        onChangeActiveItem(id);
        handleChangeActualOffer(id);
      }}
      onMouseLeave={() => {
        onChangeActiveItem(-1);
        handleChangeActualOffer(-1);
      }}
    >
      {
        isPremium
          &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}&nbsp;</b>
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
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${makeRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropValidator.OFFER,
  activeIndex: PropTypes.number.isRequired,
  onChangeActiveItem: PropTypes.func.isRequired,
  isNeighbourMode: PropTypes.bool.isRequired,
  onChangeActualOffer: PropTypes.func.isRequired,
  onChangeOfferFavoriteStatus: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onChangeActualOffer(offerID) {
    dispatch(changeActualOffer(offerID));
  },
  onChangeOfferFavoriteStatus(offerID, status) {
    dispatch(changeOfferFavoriteStatus(offerID, status));
  }
});

export default connect(null, mapDispatchToProps)(OfferCard);
