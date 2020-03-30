import React from "react";
import {changeActualFilter} from "../../actions/action-creators/offers.js";
import withActiveItem from "../../hoc/with-active-item/with-active-item.js";
import {connect} from "react-redux";

const sortTypes = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

const Sorting = ({
  activeIndex,
  onChangeActiveItem,
  isOpen,
  onToggleOpenMode,
  onChangeActualFilter
}) => {
  return (
    <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
      {
        sortTypes.map((type, index) => {
          return (
            <li
              key={index}
              className={`places__option ${activeIndex === index ? `places__option--active` : ``}`}
              tabIndex="0"
              onClick={() => {
                onChangeActiveItem(index);
                onToggleOpenMode(!isOpen);
                onChangeActualFilter(type);
              }}
            >
              {type}
            </li>
          );
        })
      }
    </ul>
  );
};

const mapStateToProps = (dispatch) => ({
  onChangeActualFilter(filter) {
    dispatch(changeActualFilter(filter));
  }
});

export default connect(null, mapStateToProps)(withActiveItem(Sorting));
