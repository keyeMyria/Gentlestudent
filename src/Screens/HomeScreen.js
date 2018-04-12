import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	Container
} from 'native-base';

import Network from './../Components/Network';
import PermissionsHome from './../Components/PermissionsHome';

const platform = Platform.select({
	ios: 'Platform: ' + Platform.OS,
	android: 'Platform: ' + Platform.OS
});

class HomeScreen extends Component {
	render() {
		return (
			<Container style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to Gentlestudent!
				</Text>
				<Text style={styles.platform}>
					{platform}
				</Text>

				<PermissionsHome/>
				<Network/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		fontWeight: 'bold',
	},
	platform: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

export default HomeScreen;