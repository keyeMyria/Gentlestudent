import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
	View,
	AppState,
	NetInfo,
	Text,
	StyleSheet
} from 'react-native';
import {
	Spinner,
	Container,
	Content
} from 'native-base';

class Network extends Component {
	state = {
		networkInfo: '',
		networkStatus: ''
	}
	componentWillMount() {
		handleFirstConnectivityChange = (connectionInfo) => {
			if(connectionInfo.type == 'cellular') {
				console.log('Cellular network: ' + connectionInfo.effectiveType);
				this.setState({
					networkInfo: connectionInfo.effectiveType,
					networkStatus: 'online'
				});
			} else if (connectionInfo.type == 'wifi') {
				console.log('Network: ' + connectionInfo.type);
				this.setState({ 
					networkInfo: connectionInfo.type,
					networkStatus: 'online'
				});
			} else {
				console.log('Network: ' + connectionInfo.type);
				this.setState({
					networkInfo: 'no network',
					networkStatus: 'offline'
				});
			}
		};
		NetInfo.addEventListener(
			'connectionChange',
			handleFirstConnectivityChange
		);
	}

	redirectIfOnline(n) {
		if(n == 'online') {
			setTimeout( () => {
				Actions.maps();
			}, 3000);
		}
	}

	render() {
		const {
			networkInfo,
			networkStatus,
		} = this.state;
		// this.redirectIfOnline(networkStatus);
		return (
			<Container style={styles.connection}>
				{/* <Text>{ networkStatus == 'offline' ? 'offline' : (<Spinner color='blue' />)}</Text> */}
				<Text style={[styles.statuswifi, styles[networkStatus] ]}>
					{ networkInfo == 'offline' ? 'No connection'  : 'Connected with ' + networkInfo }
				</Text>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	// Network
	connection: {
		alignItems: 'center',
		textAlign: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 100,
		alignSelf: "stretch",
		backgroundColor: '#FFFFFF',
	},
	statuswifi: {
		color: '#FFF',
		width: '100%',
		fontSize: 11,
		padding: 4,
		textAlign: 'center',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10,
	},
	offline: {
		backgroundColor: '#CC0077',
	},
	online: {
		backgroundColor: '#BCCD13',
	},
	p: {
		color: '#EE9900',
		fontWeight: 'bold',
		fontSize: 16,
		margin: 16,
	},
})

export default Network;