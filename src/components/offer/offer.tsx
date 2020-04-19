import * as React from "react";
import {Offer as OfferInterface, Review} from '../../prop-validator/prop-validator';
import {connect} from "react-redux";
import {makeRating, shuffleArray} from '../../helpers';
import {getOffer, getOfferReviews, getNeighbourPlaces} from '../../selectors/offers';
import {getAuthStatus} from "../../selectors/user";
import {loadOfferReviews, loadNeighbourPlaces, changeOfferFavoriteStatus} from "../../actions/action-creators/offers";
import Header from "../header/header";
import Reviews from "../reviews/reviews";
import OfferList from "../offer-list/offer-list";
import Map from "../map/map";
import Loading from "../loading/loading";
import Footer from "../footer/footer";
import withLoading from "../../hoc/with-loading/with-loading";
import history from "../../history";

interface Props {
  offer: OfferInterface,
  match: any,
  reviews: Review[],
  neighbourPlaces: OfferInterface[],
  isLoading: boolean,
  onChangeLoadingStatus(status: boolean, cb?: () => void): void,
  onLoadData(id: number): Promise<Array<string>>,
  authStatus: string,
  onChangeOfferFavoriteStatus(id: number, status: number): void
}

class Offer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      onChangeLoadingStatus,
      onLoadData,
      offer
    } = this.props;

    if (!offer) {
      history.push(`/`);
      return null;
    }

    onLoadData(offer.id).then(() => onChangeLoadingStatus(false));
    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      onChangeLoadingStatus,
      onLoadData,
      match
    } = this.props;
    const {id} = match.params;

    if (prevProps.match.params.id !== id) {
      onChangeLoadingStatus(true, () => {
        onLoadData(id).then(() => onChangeLoadingStatus(false));
      });
    }

  }

  render() {
    const {
      offer,
      isLoading,
      reviews,
      neighbourPlaces,
      authStatus,
      onChangeOfferFavoriteStatus
    } = this.props;

    if (isLoading) {
      return <Loading/>;
    }

    const {
      id,
      images,
      isPremium,
      title,
      bedrooms,
      maxAdults,
      goods,
      price,
      type,
      rating,
      description,
      isFavorite,
      host: {
        name,
        avatarUrl,
        isPro
      }
    } = offer;

    return (
      <div className="page">
        <Header/>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  shuffleArray(images).slice(0, 6).map((image, i) => {
                    return (
                      <div
                        key={`${image}-${i}`}
                        className="property__image-wrapper">
                        <img
                          className="property__image"
                          src={image}
                          alt={title}
                        />
                      </div>
                    );
                  })
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  isPremium
                  &&
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                }

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    className={`property__bookmark-button ${isFavorite ? `property__bookmark-button--active` : ``} button`}
                    type="button"
                    onClick={() => onChangeOfferFavoriteStatus(id, isFavorite ? 0 : 1)}
                  >
                    <svg className="place-card__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${makeRating(rating)}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      goods.map((good, i) => {
                        return (
                          <li key={`${good}-${i}`} className="property__inside-item">
                            {good}
                          </li>
                        );
                      })
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className={`property__avatar-wrapper ${isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                      <img
                        className="property__avatar user__avatar"
                        src={`../${avatarUrl}`}
                        width="74"
                        height="74"
                        alt={name}
                      />
                    </div>
                    <span className="property__user-name">
                      {name}
                    </span>
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {description}
                    </p>
                  </div>
                </div>
                <Reviews
                  reviews={reviews}
                  authStatus={authStatus}
                  offerID={offer.id}
                />
              </div>
            </div>
            <section
              style={{
                width: `1144px`,
                margin: `0 auto`,
                marginBottom: `40px`
              }}
              className="property__map map"
            >
              <Map
                offers={neighbourPlaces.concat(offer)}
                actualOfferID={offer.id}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OfferList
                  offers={neighbourPlaces}
                  isNeighbourMode={true}
                />
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  offer: getOffer(state, ownProps.match.params.id),
  reviews: getOfferReviews(state),
  neighbourPlaces: getNeighbourPlaces(state),
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(offerID) {
    return Promise.all([
      dispatch(loadOfferReviews(offerID)),
      dispatch(loadNeighbourPlaces(offerID))
    ]);
  },
  onChangeOfferFavoriteStatus(offerID, status) {
    dispatch(changeOfferFavoriteStatus(offerID, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(Offer));
