import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ProtectionType, Routes} from "../../consts";
import {loadAllOffers} from '../../actions/action-creators/offers';
import {checkAuth} from '../../actions/action-creators/user';
import {getApplicationStatus} from "../../selectors/application";
import history from "../../history";
import Offer from '../offer/offer';
import Main from '../main/main';
import Signin from "../signin/signin";
import Loading from "../loading/loading";
import FavoriteOffers from "../favorite-offers/favorite-offers";
import NotFound from "../not-found/not-found";
import ServerError from "../server-error/server-error";
import withLoading from "../../hoc/with-loading/with-loading";
import withAuth from "../../hoc/with-auth/with-auth";

interface Props {
  isLoading: boolean,
  app: {
    error: boolean,
    statusCode: number
  },
  onChangeLoadingStatus(status: boolean): void,
  onLoadData(): Promise<Array<string>>
};

class App extends React.PureComponent<Props, {}> {
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
    const {isLoading, app} = this.props;

    if (app.error) {
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

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    return Promise.all([
      dispatch(checkAuth()),
      dispatch(loadAllOffers())
    ]);
  }
});

const mapStateToProps = (state) => ({
  app: getApplicationStatus(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(App));
