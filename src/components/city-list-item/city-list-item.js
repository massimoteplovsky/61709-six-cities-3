import React from "react";
import {PropTypes} from "prop-types";

const CityListItem = ({
  city,
  isActive,
  onChangeActualCity,
}) => {
  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onChangeActualCity(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

CityListItem.propTypes = {
  city: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangeActualCity: PropTypes.func.isRequired
};

export default CityListItem;
