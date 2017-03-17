import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import LocationSearch from '../components/LocationSearch';
import LocationsList from '../components/LocationsList';

import '../styles/locationsList.css';

class Locations extends React.Component {
  render() {
    return (
      <section id="locations">
        <h1>Free Locations</h1>
        <LocationSearch onTermChange={this.props.actions.searchLocations} 
                   onFieldChange={this.props.actions.changeLocationField}
                   field={this.props.locationField} />
        <LocationsList locations={this.props.locations} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    locations: state.locations.data,
    locationField: state.locationField
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);