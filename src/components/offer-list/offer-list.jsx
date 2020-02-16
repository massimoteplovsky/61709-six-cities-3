import React, {PureComponent} from 'react';
import OfferCard from '../offer-card/offer-card.jsx';
import {PropTypes} from '../../prop-validator/prop-validator';

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeOffer: -1
    };

    this.handleOfferMouseEnter = this.handleOfferMouseEnter.bind(this);
  }

  handleOfferMouseEnter(offerID) {
    this.setState({activeOffer: offerID});
  }

  render() {
    const {offers, onTitleClick} = this.props;
    const {activeOffer} = this.state;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((offer) => {
            return (
              <OfferCard
                key={offer.id}
                offer={offer}
                onTitleClick={onTitleClick}
                activeOffer={activeOffer}
                onMouseEnter={this.handleOfferMouseEnter}
              />
            );
          })
        }
      </div>
    );
  }
}

OfferList.propTypes = {
  offers: PropTypes.OFFER_PROPTYPE.OFFERS,
  onTitleClick: PropTypes.OFFER_PROPTYPE.TITLE_CLICK
};

export default OfferList;
