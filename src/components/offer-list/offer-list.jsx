import React, {PureComponent} from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {PropValidator} from '../../prop-validator/prop-validator';
import {PropTypes} from "prop-types";
import withActiveItem from "../../hoc/with-active-item/with-active-item.js";

const WrappedOfferCard = withActiveItem(OfferCard);

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      offers,
      isNeighbourMode
    } = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((offer) => {
            return (
              <WrappedOfferCard
                key={offer.id}
                offer={offer}
                isNeighbourMode={isNeighbourMode}
              />
            );
          })
        }
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  isNeighbourMode: PropTypes.bool.isRequired
};

export default OfferList;
