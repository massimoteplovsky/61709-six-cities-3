import React, {PureComponent} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {PropValidator} from '../../prop-validator/prop-validator.js';
import {PropTypes} from "prop-types";
import Offer from '../offer/offer.jsx';
import Main from '../main/main.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOffer: -1
    };

    this._renderApp = this._renderApp.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  _renderApp() {
    const {offers} = this.props;
    const {currentOffer} = this.state;
    const offer = offers.find((item) => item.id === currentOffer);

    if (offer) {
      return <Offer offer={offer}/>;
    }

    return (
      <Main
        offersCount={offers.length}
        offers={offers}
        onTitleClick={this.handleTitleClick}
      />
    );
  }

  handleTitleClick(event, offerID) {
    event.preventDefault();
    this.setState({currentOffer: offerID});
  }

  render() {
    const {offers} = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
            <Offer offer={offers[0]}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  offersCount: PropTypes.number.isRequired
};

export default App;
