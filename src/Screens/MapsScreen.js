import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
	StyleSheet,
	Text,
	View,
	Button,
} from 'react-native';
import {
	Container,
	Content
} from 'native-base';
import MapView from 'react-native-maps';

class MapsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			},
			leerkansen: []
		}
	}
	componentWillMount() {
		fetch('https://gentlestudent-api.herokuapp.com/api/v1/leerkans')
			.then(res => res.json())
			.then(data => this.setState({ leerkansen: data }));
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
	render() {
		const {
			startRegion,
			geoloc,
			leerkansen,
		} = this.state;
		return(
			<Container style = {styles.container}>
				<Text>Latitude: {geoloc.latitude}</Text>
				<Text>Longitude: {geoloc.longitude}</Text>
				<MapView
					style = {styles.maps}
					initialRegion={startRegion}
				>
					{leerkansen.map(lk => (
						<MapView.Marker
							key={lk._id}
							coordinate={lk.coordinate}
							title={lk.title}
							description={lk.synopsis}
						/>
					))}
					{/* Error: JSON value '<null>' of type NSNull cannot be converted to CLLocationDegrees */}
					{/* <MapView.Marker
						coordinate={geoloc}
						title='Your location'
						description='description'
					/> */}
				</MapView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 5,
	},
	maps: {
		position: 'absolute',
		top: 50,
		left: 0,
		bottom: 0,
		right: 0,
	}
})

export default MapsScreen;