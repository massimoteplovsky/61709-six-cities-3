import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {makeCityList} from "../../helpers.js";
import {getFavoriteOffers} from "../../selectors/offers.js";
import withLoading from "../../hoc/with-loading/with-loading.js";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import FavoriteOffersEmpty from "../favorite-offers-empty/favorite-offers-empty.jsx";
import FavoriteOfferCard from "../favorite-offers-card/favorite-offers-card.jsx";

const FavoriteOffers = ({favoriteOffers}) => {

  const cities = makeCityList(favoriteOffers);

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--favorites">
        {
          favoriteOffers.length === 0 ?
            <FavoriteOffersEmpty/>
            :
            <FavoriteOfferCard
              cities={cities}
              favoriteOffers={favoriteOffers}
            />
        }
      </main>
      <Footer/>
    </div>
  );
};

FavoriteOffers.propTypes = {
  favoriteOffers: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state)
});

export default connect(mapStateToProps)(withLoading(FavoriteOffers));
