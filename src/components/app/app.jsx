import React, {PureComponent} from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {loadAllOffers} from '../../actions/action-creators/offers.js';
import history from "../../history.js";
import Offer from '../offer/offer.jsx';
import Main from '../main/main.jsx';
import Loading from "../loading/loading.jsx";
import withLoading from "../../hoc/with-loading/with-loading.js";

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
    const {isLoading} = this.props;

    if (isLoading) {
      return <Loading/>;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/offer/:id" component={Offer} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onChangeLoadingStatus: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    return Promise.all([
      dispatch(loadAllOffers())
    ]);
  }
});

export default connect(null, mapDispatchToProps)(withLoading(App));
