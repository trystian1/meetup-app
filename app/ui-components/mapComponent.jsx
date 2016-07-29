import React from 'react';

class MapComponent extends React.Component {

  componentDidMount() {

    var _this = this,
        script = document.createElement('script');

    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDP8p3kVZe096Y9s7lCwcHOQoYjDJ_Y6rE&libraries=places&callback=initMap');
    document.getElementsByTagName('head')[0].appendChild(script);

    window.initMap = () => {

      var latlng = new google.maps.LatLng(52.2616391, 4.7693348);

      _this.map = new google.maps.Map(_this.refs.map, {
        center: latlng,
        zoom: 18
      });

    }

  }

  componentDidUpdate() {

    var place = this.props.place;

    if (this.map && this.props.place[0]) {

      this.map.setCenter(this.props.place[0].geometry.location);

      var marker = new google.maps.Marker({
        map: this.map,
        position: this.props.place[0].geometry.location
      });

    }

  }


  render() {


    const mapStyle = {
      width: '100%',
      height: 400,
      position: 'absolute',
      left: 0,
    };

    return(
      <div className='map-wrap'>
          <div className='map-element' style={mapStyle} ref="map" ref="map">I should be a map!</div>
      </div>
    )
  }
}


MapComponent.propTypes = {
    place: React.PropTypes.object.isRequired,
}

export default MapComponent;
