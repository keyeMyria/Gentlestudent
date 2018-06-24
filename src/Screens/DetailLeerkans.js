import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { LeerkansenFetchById } from './../actions/leerkansActions';

import {
	View,
  Text,
  Button
} from 'react-native';

class DetailLeerkans extends Component {
  componentDidMount() {
    this.props.fetchLeerkansenById(this.props.navigation.state.params.id);
  }
  render() {
    return (
      <View>
        <Button title="back" onPress={() => Actions.maps()}/>
				<Text>{this.props.leerkansen.item.title}</Text>
        <Text>{this.props.leerkansen.item.created_at}</Text>
        <Text>{this.props.leerkansen.item.description}</Text>
        <Text>{this.props.leerkansen.item.badge}</Text>
        <Button title="Doe mee!" />
			</View>
    )
  }
}

export default connect(
  (state) => {
    return {
      leerkansen: state.leerkansen
    };
  },
  (dispatch) => {
    return {
      fetchLeerkansenById: (id) => {
        dispatch(LeerkansenFetchById(id));
      }
    };
  }
)(DetailLeerkans);
