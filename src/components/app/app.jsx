import React, {PureComponent} from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {ProtectionType, Routes} from "../../consts.js";
import {loadAllOffers} from '../../actions/action-creators/offers.js';
import {checkAuth} from '../../actions/action-creators/user.js';
import history from "../../history.js";
import Offer from '../offer/offer.jsx';
import Main from '../main/main.jsx';
import Signin from "../signin/signin.jsx";
import Loading from "../loading/loading.jsx";
import FavoriteOffers from "../favorite-offers/favorite-offers.jsx";
import NotFound from "../not-found/not-found.jsx";
import ServerError from "../server-error/server-error.jsx";
import withLoading from "../../hoc/with-loading/with-loading.js";
import withAuth from "../../hoc/with-auth/with-auth.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      onChangeLoadingStatus,
      onLoadData
    } = this.props;

    onLoadData().then(() => {
      onChangeLoadingStatus(false);
    });
  }

  render() {
    const {isLoading, error} = this.props;

    if (error) {
      return <ServerError/>;
    }

    if (isLoading) {
      return <Loading/>;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={Routes.MAIN} component={Main} />
          <Route exact path={Routes.OFFER_ID} component={Offer} />
          <Route exact path={Routes.SIGN_IN} component={withAuth(Signin, ProtectionType.AUTH_USER)} />
          <Route exact path={Routes.FAVORITES} component={withAuth(FavoriteOffers, ProtectionType.UNAUTH_USER)} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onChangeLoadingStatus: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    return Promise.all([
      dispatch(loadAllOffers()),
      dispatch(checkAuth())
    ]);
  }
});

const mapStateToProps = (state) => ({
  error: state.application.error
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(App));
