import * as React from "react";
import {connect} from "react-redux";
import {Offer} from "../../prop-validator/prop-validator";
import {makeCityList} from "../../helpers";
import {getFavoriteOffers} from "../../selectors/offers";
import withLoading from "../../hoc/with-loading/with-loading";
import Header from "../header/header";
import Loading from "../loading/loading";
import Footer from "../footer/footer";
import FavoriteOffersEmpty from "../favorite-offers-empty/favorite-offers-empty";
import FavoriteOfferCard from "../favorite-offers-card/favorite-offers-card";
import {loadFavoriteOffers} from "../../actions/action-creators/offers";

interface Props {
  favoriteOffers: Offer[],
  isLoading: boolean,
  onLoadData(): Promise<Array<string>>,
  onChangeLoadingStatus(status: boolean): void
}

class FavoriteOffers extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      onLoadData,
      onChangeLoadingStatus
    } = this.props;

    onLoadData().then(() => onChangeLoadingStatus(false))
  }

  render() {
    const {
      favoriteOffers,
      isLoading
    } = this.props;

    if(isLoading) {
      return <Loading/>;
    }

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
  }
}

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    return Promise.all([
      dispatch(loadFavoriteOffers())
    ])
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(FavoriteOffers));
