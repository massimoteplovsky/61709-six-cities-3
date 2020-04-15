import React from 'react';
import {PropValidator} from '../../prop-validator/prop-validator';
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {getOffersByCity, getAllOffers, getActualCity, getActualFilter} from "../../selectors/offers.js";
import OfferList from '../offer-list/offer-list.jsx';
import Map from "../map/map.jsx";
import CityList from "../city-list/city-list.jsx";
import Header from "../header/header.jsx";
import Sorting from "../sorting/sorting.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import withOpenItem from "../../hoc/with-open-item/with-open-item.js";

const Main = ({
  offers,
  filteredOffers,
  actualCity,
  actualOffer,
  actualFilter,
  isOpen,
  onToggleOpenMode
}) => {

  if (filteredOffers.length === 0) {
    return <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList offers={offers}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {`${filteredOffers.length} places to stay in ${actualCity}`}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by </span>
                <span
                  className="places__sorting-type"
                  tabIndex="0"
                  onClick={() => onToggleOpenMode(!isOpen)}
                >
                  {actualFilter}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <Sorting
                  isOpen={isOpen}
                  onToggleOpenMode={onToggleOpenMode}
                />
              </form>
              <OfferList
                offers={filteredOffers}
                isNeighbourMode={false}
              />
            </section>
            <div className="cities__right-section">
              <Map
                offers={filteredOffers}
                actualOfferID={actualOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  actualCity: PropTypes.string.isRequired,
  filteredOffers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  actualOffer: PropTypes.number.isRequired,
  actualFilter: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleOpenMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offers: getAllOffers(state),
  actualCity: getActualCity(state),
  actualFilter: getActualFilter(state),
  filteredOffers: getOffersByCity(state),
  actualOffer: state.offers.actualOffer
});

export default connect(mapStateToProps)(withOpenItem(Main));
