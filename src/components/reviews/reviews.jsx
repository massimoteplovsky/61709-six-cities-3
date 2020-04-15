import React from "react";
import FormReview from "../form-review/form-review.jsx";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import {PropTypes, string} from "prop-types";
import {sortByDate} from "../../helpers.js";
import ReviewsItem from "../reviews-item/reviews-item.js";
import {Authorization} from "../../consts.js";

const Reviews = ({
  reviews,
  authStatus,
  offerID
}) => {

  return (
    <section className="property__reviews reviews">
      {
        reviews.length > 0 ?
          <>
            <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
            <ul className="reviews__list">
              {
                reviews.sort(sortByDate).map((review) => {
                  return (
                    <ReviewsItem key={review.id} review={review}/>
                  );
                })
              }
            </ul>
          </>
          :
          <h2 style={{
            textAlign: `center`,
            marginBottom: `55px`
          }}>
            No reviews for this place.
          </h2>
      }
      {authStatus === Authorization.AUTH ? <FormReview offerID={offerID}/> : null}
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropValidator.REVIEW).isRequired,
  authStatus: string.isRequired,
  offerID: PropTypes.number.isRequired
};

export default Reviews;
