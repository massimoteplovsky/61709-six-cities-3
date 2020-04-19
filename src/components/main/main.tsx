import * as React from "react";
import {Offer} from '../../prop-validator/prop-validator';
import {connect} from "react-redux";
import {getOffersByCity, getAllOffers, getActualCity, getActualFilter} from "../../selectors/offers";
import OfferList from '../offer-list/offer-list';
import Map from "../map/map";
import CityList from "../city-list/city-list";
import Header from "../header/header";
import Sorting from "../sorting/sorting";
import MainEmpty from "../main-empty/main-empty";
import withOpenItem from "../../hoc/with-open-item/with-open-item";

interface Props {
  offers: Offer[]
  filteredOffers: Offer[],
  actualCity: string,
  actualOffer: number,
  actualFilter: string,
  isOpen: boolean
  onToggleOpenMode(isOpen: boolean): void
}

const Main: React.FC<Props> = (props: Props) => {

  const {
      offers,
      filteredOffers,
      actualCity,
      actualOffer,
      actualFilter,
      isOpen,
      onToggleOpenMode
  } = props;

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
                  tabIndex={0}
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

const mapStateToProps = (state) => ({
  offers: getAllOffers(state),
  actualCity: getActualCity(state),
  actualFilter: getActualFilter(state),
  filteredOffers: getOffersByCity(state),
  actualOffer: state.offers.actualOffer
});

export default connect(mapStateToProps)(withOpenItem(Main));
