import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { LeerkansenFetch } from './../actions/leerkansActions';

import {
	StyleSheet,
	Alert,
	Image,
} from 'react-native';
import {
	Header,
	Body,
	Segment,
	Left,
	Right,
	Icon,
	Button,
	Text,
	Container,
	Content
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';

// import Navigation from './../Components/Navigation';

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
		} = this.state;
		return(
			<Container style = {styles.container}>
				<Header>
					<Left>
						<Image
							style={{width: 40, height: 40}}
							source={require('./../assets/logo.png')}
						/>
					</Left>
					<Body>
						<Segment>
							<Button
								first
								active
							>
								<Text>Kaart</Text>
							</Button>
							<Button
								last
								onPress={() => Actions.replace('list')}
							>
								<Text>Lijst</Text>
							</Button>
						</Segment>
					</Body>
					<Right>
						<Button 
							transparent
							onPress = {() => {
									Alert.alert(
										'Coming soon..',
										'Search function coming soon. Stay tuned!',
										[{ text: 'Cancel', style: 'cancel' }],
									)
								}
							}
						>
							<Icon name="search" />
						</Button>
					</Right>
				</Header>
				<Content padder>
					<Text>Latitude: {geoloc.latitude}</Text>
					<Text>Longitude: {geoloc.longitude} | {this.props.leerkansen.loading ? 'loading...': null}</Text>
					
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
								title={lk.title}
								description={lk.synopsis}
							/>
						)
					})}
				</MapView>
				{/* <Navigation /> */}
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