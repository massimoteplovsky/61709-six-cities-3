import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {PropTypes} from "prop-types";
import {makeRating} from '../../helpers';

const OfferCard = ({offer, activeOffer, onTitleClick, onMouseEnter}) => {
  const {
    id,
    title,
    img,
    price,
    rating,
    type
  } = offer;

  return (
    <article
      key={id}
      className={`cities__place-card place-card ${activeOffer === id ? `active` : ``}`}
      onMouseEnter={() => onMouseEnter(id)}
    >
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#" onClick={(event) => onTitleClick(event, id)}>
          <img className="place-card__image" src={img} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
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
        <h2 className="place-card__name" onClick={(event) => onTitleClick(event, id)}>
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropValidator.OFFER,
  activeOffer: PropTypes.number.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired
};

export default OfferCard;
