import React from "react";
import {PropTypes} from "prop-types";
import Header from "../header/header.jsx";
import {connect} from "react-redux";
import {login} from "../../actions/action-creators/user.js";
import history from "../../history.js";
import withForm from "../../hoc/with-form/with-form.js";
import {changeActualCity} from "../../actions/action-creators/offers.js";

const Signin = ({
  formError,
  formErrorData,
  onFormSubmit,
  onSendForm,
  showErrors,
  addErrorClass,
  onChangeField,
  onChangeActualCity
}) => {

  return (
    <div className="page page--gray page--login">
      <Header/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {
              formError &&
              <div
                style={{
                  display: `flex`,
                  flexFlow: `column`,
                  justifyContent: `center`,
                  color: `red`
                }}
              >
                {showErrors(formErrorData)}
              </div>
            }
            <form
              className="login__form form"
              onSubmit={(event) => onFormSubmit(event, onSendForm, [`email`, `password`])}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className={`login__input form__input ${formError ? addErrorClass(`email`) : ``}`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => onChangeField(event)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input ${formError ? addErrorClass(`password`) : ``}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) => onChangeField(event)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                onClick={(event) => {
                  event.preventDefault();
                  onChangeActualCity(`Amsterdam`);
                  history.push(`/`);
                }}
              >
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Signin.propTypes = {
  formError: PropTypes.bool.isRequired,
  formErrorData: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onSendForm: PropTypes.func.isRequired,
  showErrors: PropTypes.func.isRequired,
  addErrorClass: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onChangeActualCity: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onSendForm(data) {
    dispatch(login(data));
  },
  onChangeActualCity(city) {
    dispatch(changeActualCity(city));
  }
});

export default connect(null, mapDispatchToProps)(withForm(Signin));
