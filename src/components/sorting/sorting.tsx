import * as React from "react";
import {changeActualFilter} from "../../actions/action-creators/offers";
import {connect} from "react-redux";
import withActiveItem from "../../hoc/with-active-item/with-active-item";

interface Props {
  activeIndex: number,
  onChangeActiveItem(index: number): void,
  isOpen: boolean,
  onToggleOpenMode(isOpen: boolean): void,
  onChangeActualFilter(type: string): void
}

const sortTypes = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

const Sorting: React.FC<Props> = (props: Props) => {
  const {
    activeIndex,
    onChangeActiveItem,
    isOpen,
    onToggleOpenMode,
    onChangeActualFilter
  } = props;
  return (
    <ul className={`places__options places__options--custom ${isOpen ? `places__options--opened` : ``}`}>
      {
        sortTypes.map((type, index) => {
          return (
            <li
              key={index}
              className={`places__option ${activeIndex === index ? `places__option--active` : ``}`}
              tabIndex={0}
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
