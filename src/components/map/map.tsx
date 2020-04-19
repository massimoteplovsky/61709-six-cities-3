import * as React from "react";
import {Offer} from '../../prop-validator/prop-validator';
import * as leaflet from "leaflet";

interface Props {
  offers: Offer[],
  actualOfferID: number
}

const icon = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});
const activeIcon = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [30, 30]
});

class Map extends React.PureComponent<Props, {}> {

  private _mapContainer: React.RefObject<HTMLDivElement>;
  private _map: any;
  private _markers: any;

  constructor(props) {
    super(props);

    this._mapContainer = React.createRef();
    this._map = null;
    this._markers = null;
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

    this._markers = leaflet.layerGroup();

    this._map = leaflet.map(container, {
      zoomControl: false,
      //marker: true
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
      this._markers.clearLayers();
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
      this._markers.addLayer(
          leaflet.marker(
              [location.latitude, location.longitude],
              id === actualOfferID ? {icon: activeIcon} : {icon}
          ).bindPopup(title)
      );
      this._markers.addTo(this._map);
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

export default Map;
