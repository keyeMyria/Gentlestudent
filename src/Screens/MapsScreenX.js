import React, { Component } from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import {
	Container,
	Content,
	Header,
	Footer,
	FooterTab,
	Text,
	Button
} from 'native-base';
import MapView from 'react-native-maps';

class MapsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Maps',
		headerLeft: null,
	});
	state = {
		// Geolocation - LatLng
		geoloc: {
			latitude: null,
			longitude: null,
		},
		// Default region
		startRegion: {
			latitude: 51.049079,
			longitude: 3.728876,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		},
		// Markers
		markers: 
		[
			{
				id: 0,
				title: 'de Krook',
				coordinates: {
					latitude: 51.049079,
					longitude: 3.728876
				}
			},
			{
				id: 1,
				title: 'Hoogpoort Arteveldehogeschool',
				coordinates: {
					latitude: 51.055002,
					longitude: 3.724542,
				}
			}
		],
		// Error
		error: null,
	}
	componentDidMount() {
		// Set state for default region
		this.setState({ startRegion: this.state.startRegion });

		// Geolocation - watch position
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
				console.log(position.coords);
				this.setState({
					geoloc: position.coords,
					error: null,
				});
			},
			(error) => {
				this.setState({ error: error.message })
			},
			{ 
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000
			},
		);
	}
	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchId);
	}
	render() {
		const {
			startRegion,
			leerkansen,
			geoloc,
		} = this.state;
		return (
			<Container>
				
			</Container>
		)
	}
}
const styles = StyleSheet.create({
	maps: {
		position: 'absolute',
		top: 100,
		left: 0,
		bottom: 50,
		right: 0,
	},
});

export default MapsScreen;
