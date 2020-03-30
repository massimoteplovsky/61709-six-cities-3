import React from "react";
import FormReview from "../form-review/form-review.jsx";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import {PropTypes} from "prop-types";
import {sortByDate} from "../../helpers.js";
import ReviewsItem from "../reviews-item/reviews-item.js";

const Reviews = ({reviews}) => {

  if (reviews.length === 0) {
    return (
      <p>No reviews for this place</p>
    );
  }

  return (
    <section className="property__reviews reviews">
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
      <FormReview/>
    </section>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropValidator.REVIEW).isRequired
};

export default Reviews;
