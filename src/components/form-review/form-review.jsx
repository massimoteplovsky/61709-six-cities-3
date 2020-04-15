import React, {Fragment} from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {sendReview} from "../../actions/action-creators/offers.js";
import {makeTitle} from "../../helpers.js";
import withForm from "../../hoc/with-form/with-form.js";

const FormReview = ({
  offerID,
  isFormValid,
  isFormSent,
  onFormSubmit,
  onChangeField,
  onSendForm,
  formFields
}) => {
  const starRating = new Array(5).fill(``).map((_, index) => index + 1).reverse();
  const fields = [`rating`, `comment`];

  return (
    <form
      className="reviews__form form"
      onSubmit={(event) => onFormSubmit(event, onSendForm(offerID), fields)}
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          starRating.map((star) => {
            return (
              <Fragment key={star}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={star}
                  checked={star === Number(formFields.rating.value)}
                  id={`${star}-stars`}
                  type="radio"
                  onChange={(event) => onChangeField(event, fields)}
                  disabled={isFormSent}
                />
                <label
                  htmlFor={`${star}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={makeTitle(star)}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formFields.comment.value}
        onChange={(event) => onChangeField(event, fields)}
        disabled={isFormSent}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isFormSent}
        >
          {isFormSent ? `Sending...` : `Submit`}
        </button>
      </div>
    </form>
  );
};

FormReview.propTypes = {
  offerID: PropTypes.number.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isFormSent: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onSendForm: PropTypes.func.isRequired,
  formFields: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSendForm(offerID) {
    return (reviewData, clearField) => {
      dispatch(sendReview(offerID, reviewData, clearField));
    };
  }
});

export default connect(null, mapDispatchToProps)(withForm(FormReview));
