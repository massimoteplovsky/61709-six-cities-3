import * as React from "react";
import {makeRating, getFormatDate} from "../../helpers";
import {Review} from "../../prop-validator/prop-validator";

interface Props {
  review: Review
}

const ReviewsItem: React.FC<Props> = (props: Props) => {

  const {
    review: {
      id,
      rating,
      comment,
      date,
      user: {
        name,
        avatarUrl
      }
    }
  } = props;

  return (
    <li key={id} className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${makeRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">{getFormatDate(date)}</time>
      </div>
    </li>
  );
};

export default ReviewsItem;
