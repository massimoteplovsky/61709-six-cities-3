import React, {PureComponent, createRef} from "react";
import {PropValidator} from '../../prop-validator/prop-validator';
import {PropTypes} from "prop-types";
import leaflet from "leaflet";

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = createRef();
  }

  componentDidMount() {
    const container = this._map.current;
    const {offers} = this.props;
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(container, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

    // const offerCords = [52.3709553943508, 4.89309666406198];
    offers.forEach(({coordinates}) => {
      leaflet
      .marker(coordinates, {icon})
      .addTo(map);
    });
  }

  render() {

    return (
      <section className="cities__map map">
        <div
          id="map"
          style={{
            height: `100%`
          }}
          ref={this._map}
        ></div>
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired
};

export default Map;
