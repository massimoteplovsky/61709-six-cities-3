import * as React from "react";
import {Offer} from "../../prop-validator/prop-validator";
import {connect} from "react-redux";
import {makeCityList} from "../../helpers";
import {changeActualCity} from "../../actions/action-creators/offers";
import CityListItem from "../city-list-item/city-list-item";
import {getActualCity} from "../../selectors/offers";

interface Props {
  offers: Offer[],
  actualCity: string,
  onChangeActualCity(city: string): void;
}

const CityList: React.FC<Props> = (props: Props) => {
  const {
    offers,
    actualCity,
    onChangeActualCity,
  } = props;
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

const mapStateToProps = (state) => ({
  actualCity: getActualCity(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeActualCity(city: string): void {
      dispatch(changeActualCity(city));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityList);
