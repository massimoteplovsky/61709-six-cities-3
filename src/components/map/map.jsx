import React, {PureComponent, createRef} from "react";
import {PropValidator} from '../../prop-validator/prop-validator';
import {PropTypes} from "prop-types";
import leaflet from "leaflet";

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});
const activeIcon = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapContainer = createRef();
    this._map = null;
  }

  componentDidMount() {
    const container = this._mapContainer.current;
    const {offers, actualOfferID} = this.props;

    if (offers.length === 0) {
      return null;
    }

    const {
      city: {
        location: {
          latitude,
          longitude,
          zoom
        }
      }
    } = offers[0];

    this.markers = leaflet.layerGroup();

    this._map = leaflet.map(container, {
      zoomControl: false,
      marker: true
    });

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);

    this._map.setView([latitude, longitude], zoom);

    this.showMarkers(offers, actualOfferID);

    return true;
  }

  componentDidUpdate(prevProps) {
    const {offers, actualOfferID} = this.props;

    if (offers.length === 0) {
      return null;
    }

    const {
      city: {
        location: {
          latitude,
          longitude,
          zoom
        }
      }
    } = offers[0];

    if (prevProps.offers !== offers || prevProps.actualOfferID !== actualOfferID) {
      this.markers.clearLayers();
      this._map.setView([latitude, longitude], zoom);
      this.showMarkers(offers, actualOfferID);
    }

    return true;
  }

  componentWillUnmount() {
    this._map.remove();
    this._map = null;
  }

  showMarkers(offers, actualOfferID) {
    offers.forEach(({title, location, id}) => {
      this.markers.addLayer(
          leaflet.marker(
              [location.latitude, location.longitude],
              id === actualOfferID ? {icon: activeIcon} : {icon}
          ).bindPopup(title)
      );
      this.markers.addTo(this._map);
    });
  }

  render() {
    const {offers} = this.props;

    if (offers.length === 0) {
      return <section className="cities__map map"></section>;
    }

    return (
      <div
        id="map"
        style={{
          width: `100%`,
          height: `100%`
        }}
        ref={this._mapContainer}
      ></div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropValidator.OFFER).isRequired,
  actualOfferID: PropTypes.number.isRequired
};

export default Map;
