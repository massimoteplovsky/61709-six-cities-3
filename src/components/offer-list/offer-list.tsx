import * as React from "react";
import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../prop-validator/prop-validator';
import withActiveItem from "../../hoc/with-active-item/with-active-item";

const WrappedOfferCard = withActiveItem(OfferCard);

interface Props {
  offers: Offer[],
  isNeighbourMode: boolean
}

const OfferList: React.FC<Props> = (props: Props) => {

  const {
    offers,
    isNeighbourMode
  } = props;

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

export default OfferList;
