import React from "react";
import {connect} from "react-redux";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import {PropTypes} from "prop-types";
import {getAllOffers, getActualCity} from "../../selectors/offers.js";
import Header from "../header/header.jsx";
import CityList from "../city-list/city-list.jsx";
import withActiveItem from "../../hoc/with-active-item/with-active-item.js";

const WrappedCityList = withActiveItem(CityList);

const MainEmpty = ({
  offers,
  actualCity
}) => {
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <WrappedCityList offers={offers}/>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property availbale at the moment in {actualCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainEmpty.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  actualCity: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  offers: getAllOffers(state),
  actualCity: getActualCity(state),
});

export default connect(mapStateToProps)(MainEmpty);
