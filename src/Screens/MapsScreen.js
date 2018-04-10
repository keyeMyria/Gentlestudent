import React, { Component } from 'react';
import {
	StyleSheet,
	Container,
	Content,
	Header,
	Footer,
	FooterTab,
	Text,
	View,
	Button,
} from 'react-native';
import MapView from 'react-native-maps';

class MapsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Maps',
		headerLeft: null,
	});
	render() {
		return (
			<Container>
				
			</Container>
		)
	}
}

export default MapsScreen;