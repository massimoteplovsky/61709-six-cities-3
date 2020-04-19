import * as React from "react";
import FormReview from "../form-review/form-review";
import {Review} from "../../prop-validator/prop-validator";
import {sortByDate} from "../../helpers";
import ReviewsItem from "../reviews-item/reviews-item";
import {Authorization} from "../../consts";

interface Props {
  reviews: Review[],
  authStatus: string,
  offerID: number
}

const Reviews: React.FC<Props> = (props: Props) => {

  const {
    reviews,
    authStatus,
    offerID
  } = props;

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

export default Reviews;
