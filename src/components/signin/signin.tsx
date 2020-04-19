import * as React from "react";
import Header from "../header/header";
import {connect} from "react-redux";
import {login} from "../../actions/action-creators/user";
import history from "../../history";
import withForm from "../../hoc/with-form/with-form";
import {changeActualCity} from "../../actions/action-creators/offers";

interface FormData {
  email: string,
  password: string
}

interface Props {
  formError: boolean,
  onFormSubmit(event: React.SyntheticEvent, onSendForm: (data: FormData) => void, fields: string[]): void,
  onSendForm(data: FormData): void,
  onShowErrors(): React.ReactNode,
  onAddErrorClass(field: string): void,
  onChangeField(event: React.SyntheticEvent): void,
  onChangeActualCity(city: string): void
}

const Signin: React.FC<Props> = (props: Props) => {

  const {
    formError,
    onFormSubmit,
    onSendForm,
    onShowErrors,
    onAddErrorClass,
    onChangeField,
    onChangeActualCity
  } = props;

  const fields = [`email`, `password`];

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
                {onShowErrors()}
              </div>
            }
            <form
              className="login__form form"
              onSubmit={(event) => onFormSubmit(event, onSendForm, fields)}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className={`login__input form__input ${formError ? onAddErrorClass(`email`) : ``}`}
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => onChangeField(event)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={`login__input form__input ${formError ? onAddErrorClass(`password`) : ``}`}
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

const mapDispatchToProps = (dispatch) => ({
  onSendForm(data) {
    dispatch(login(data));
  },
  onChangeActualCity(city) {
    dispatch(changeActualCity(city));
  }
});

export default connect(null, mapDispatchToProps)(withForm(Signin));
