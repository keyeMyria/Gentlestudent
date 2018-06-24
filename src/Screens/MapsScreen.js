import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { LeerkansenFetch } from './../actions/leerkansActions';

import { StyleSheet } from 'react-native';
import {
	View,
	Text,
	Container,
	Content
} from 'native-base';
import MapView, { Marker, Callout } from 'react-native-maps';

import Header from './../Components/Maps/Header';
import Navigation from './../Components/Navigation';

import global from './../global';

class MapsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// seg
			// Geolocation
			geoloc: {
				latitude: null,
				longitude: null,
			},
			// Default region - Ghent
			startRegion: {
				latitude: 51.054932,
				longitude: 3.717786,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}
		}
	}
	componentDidMount() {
		// fetchLeerkansen
		this.props.fetchLeerkansen();
		// Set state for default region
		this.setState({ startRegion: this.state.startRegion });
		// Geolocation - watch position
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				this.setState({
					geoloc: position.coords,
				});
			},
			(error) => {
				console.log(error.message);
			},
			{ 
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			},
		);
	}
	recordEvent(name) {
    return e => {
      if (e.persist) {
        e.persist();  // Avoids warnings relating to https://fb.me/react-event-pooling
			}
      Actions.detailLeerkans({ id: name.id });
    };
  }
	render() {
		const {
			startRegion,
			geoloc,
		} = this.state;
		return(
			<Container style = {styles.container}>
				<Header />
				<Content padder>
					<Text>Latitude: {geoloc.latitude}</Text>
					<Text>Longitude: {geoloc.longitude} {this.props.leerkansen.loading ? ' | loading...': null}</Text>
					
				</Content>
				<MapView
					style = {styles.maps}
					initialRegion={startRegion}
					showsUserLocation
					// provider={MapView.PROVIDER_GOOGLE} // Google Maps => doesn't have zoom level
				>
					{this.props.leerkansen.items.map(lk => {
						return(
							<Marker
								key={lk._id}
								coordinate={lk.coordinate}
							>
								<Callout
									style={styles.plainView}
									onPress={this.recordEvent({
										event: 'Callout::onPress',
										id: lk._id
									})}
								>
									<View>
										<Text>{lk._id}</Text>
										<Text>{lk.title}</Text>
										<Text>{lk.synopsis}</Text>
									</View>
								</Callout>
							</Marker>
						)
					})}
				</MapView>
				<Navigation />
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	maps: {
		position: 'absolute',
		top: 120,
		left: 0,
		bottom: 50,
		right: 0,
	},
	plainView: {
		width: 300
	}
})

export default connect(
	(state) => {
		return {
			leerkansen: state.leerkansen
		};
	},
	(dispatch) => {
		return {
			fetchLeerkansen: () => {
				dispatch(LeerkansenFetch());
			}
		}
	}
)(MapsScreen);