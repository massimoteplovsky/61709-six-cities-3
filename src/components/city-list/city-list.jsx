import React from "react";
import {PropValidator} from "../../prop-validator/prop-validator.js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {makeCityList} from "../../helpers.js";
import {changeActualCity} from "../../actions/action-creators/offers.js";
import CityListItem from "../city-list-item/city-list-item.js";


const CityList = ({
  offers,
  activeIndex,
  onChangeActualCity,
  onChangeActiveItem
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
                  isActive={activeIndex === i}
                  index={i}
                  onChangeActualCity={onChangeActualCity}
                  onChangeActiveItem={onChangeActiveItem}
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
  activeIndex: PropTypes.number.isRequired,
  onChangeActiveItem: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeActualCity(city) {
      dispatch(changeActualCity(city));
    }
  };
};

export default connect(null, mapDispatchToProps)(CityList);
