import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';
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

		// Set state for markers
		this.setState({ markers: this.state.markers });

		// Geolocation - watch position
		this.watchId = navigator.geolocation.watchPosition(
			(position) => {
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
			markers,
			geoloc,
		} = this.state;
		return (
			<View style={styles.container}>

				<Text>Latitude: {geoloc.latitude}</Text>
				<Text>Longitude: {geoloc.longitude}</Text>
				{this.state.error ? <Text>Error: {this.state.error}</Text> : null}

				<MapView
					style = {styles.maps}
					initialRegion = { startRegion }
				>
					{this.state.markers.map( (marker, index) => (
						<MapView.Marker
							key = {index}
							coordinate = {marker.coordinates}
						/>
					))}
					{this.state.markers.map( (marker, index) => (
						<MapView.Marker
							key = {index}
							coordinate = {marker.coordinates}
						/>
					))}

					{/* <MapView.Marker
						coordinate = {geoloc}
					/> */}
				</MapView>
				<Tabs style={styles.tabs}/>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		alignItems: 'center',
		backgroundColor: '#FEFEFE',
	},
	maps: {
		position: 'absolute',
		top: 100,
		left: 0,
		bottom: 50,
		right: 0,
	},
});

export default MapsScreen;
