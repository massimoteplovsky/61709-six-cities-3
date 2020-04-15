import React from "react";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {makeCityList} from "../../helpers.js";
import {changeActualCity} from "../../actions/action-creators/offers.js";
import CityListItem from "../city-list-item/city-list-item.js";
import {getActualCity} from "../../selectors/offers.js";


const CityList = ({
  offers,
  actualCity,
  onChangeActualCity,
}) => {
  const cities = makeCityList(offers);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city, i) => {
              return (
                <CityListItem
                  key={`${city}-${i}`}
                  city={city}
                  isActive={actualCity === city}
                  onChangeActualCity={onChangeActualCity}
                />
              );
            })
          }
        </ul>
      </section>
    </div>
  );
};

CityList.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  onChangeActualCity: PropTypes.func.isRequired,
  actualCity: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  actualCity: getActualCity(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeActualCity(city) {
      dispatch(changeActualCity(city));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
