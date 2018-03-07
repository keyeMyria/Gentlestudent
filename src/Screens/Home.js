import React, { Component } from 'react';
import { Tabs } from '../Components/router';
import {
	Platform,
	NetInfo,
	StyleSheet,
	Text,
	View,
	AppState,
	Alert,
	Button,
	TouchableHighlight
} from 'react-native';
import Permissions from 'react-native-permissions';

const platform = Platform.select({
	ios: 'Platform: ' + Platform.OS,
	android: 'Platform: ' + Platform.OS
});

class Home extends Component {
	state = {
		networkInfo: '',
		networkStatus: '',
		permissionTypes: [],
		permissionStatus: {},
	}
	static navigationOptions = ({ navigation }) => ({
		title: 'Home - Gentlestudent'
	});
	componentDidMount() {
		// Get all permissionTypes of connection
		let typez = Permissions.getTypes()

		// Push some of the permissionTypes tot the array (to give permission afterwards)
		let permissionTypes = []
		permissionTypes.push(
			typez[1], //cam
			typez[7], //ble
			typez[8], //notification
		)
		let canOpenSettings = Permissions.canOpenSettings()
		this.setState({ permissionTypes, canOpenSettings })

		// Give permissions to all the permissionTypes you've got
		permissionTypes.map(p => {
			this._requestPermission(p)
		})

		// Update permission on change event
		this._updatePermissions(permissionTypes)
		AppState.addEventListener('change', this._handleAppStateChange)
	}
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange)
	}
	_handleAppStateChange = appState => {
		if (appState == 'active') {
			this._updatePermissions(this.state.permissionTypes)
		}
	}
	
	_openSettings = () =>
		Permissions.openSettings()
			.then(() => alert('Permissions updated'))
	
	_updatePermissions = permissionTypes => {
		Permissions.checkMultiple(permissionTypes)
			.then(permissionStatus => {
				if (this.state.isAlways) {
					return Permissions.check('location', 'always').then(location => ({
						...permissionStatus,
						location,
					}))
				}
				return permissionStatus
			})
			.then(permissionStatus => this.setState({ permissionStatus }))
	}
	
	_requestPermission = permission => {
		let options;
		if (permission == 'location') {
			options = this.state.isAlways ? 'always' : 'whenInUse'
		}
		Permissions.request(permission, options)
			.then(res => {
				this.setState({
					permissionStatus: { ...this.state.permissionStatus, [permission]: res },
				})
				if (res != 'authorized') {
					var buttons = [{ text: 'Cancel', style: 'cancel' }]
					if (this.state.canOpenSettings) {
						buttons.push({
							text: 'Open Settings',
							onPress: this._openSettings,
						})
						Alert.alert(
							'Whoops!',
							'Please turn on your bluetooth.',
							buttons,
						)
					}
				}
			})
			.catch( (e) => { console.warn(e) })
	}

	_onLocationSwitchChange = () => {
		this.setState({ isAlways: !this.state.isAlways })
		this._updatePermissions(this.state.permissionTypes)
	}
	componentWillMount() {
		handleFirstConnectivityChange = (connectionInfo) => {
			if(connectionInfo.type == 'cellular') {
				console.log('Cellular network: ' + connectionInfo.effectiveType);
				this.setState({
					networkInfo: connectionInfo.effectiveType,
					networkStatus: 'online'
				})
			} else if (connectionInfo.type == 'wifi') {
				console.log('Network: ' + connectionInfo.type);
				this.setState({ 
					networkInfo: connectionInfo.type,
					networkStatus: 'online'
				})
			} else {
				console.log('Network: ' + connectionInfo.type);
				this.setState({
					networkInfo: 'offline',
					networkStatus: 'offline'
				})
			}
		};
		NetInfo.addEventListener(
			'connectionChange',
			handleFirstConnectivityChange
		);
	}
	render() {
		const {
			networkInfo,
			networkStatus,
		} = this.state
		if(networkStatus == 'online') {
			setTimeout( () => {
				this.props.navigation.navigate('Privacy')
			}, 5000);
		}
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to Gentlestudent!
				</Text>
				<Text style={styles.platform}>
					{platform}
				</Text>

				<Text style={styles.instructions}>
					Connection: { networkInfo ? networkInfo  : 'NA' }
				</Text>

				{/* {this.state.permissionTypes.map(p => (
					<TouchableHighlight
						style={[styles.button, styles[this.state.permissionStatus[p]]]}
						key={p}
					>
						<Text style={[styles.button, styles[this.state.permissionStatus[p]]]}>
							{ p  + ' - ' }
							<Text style={styles.subtext}>
								{ this.state.permissionStatus[p] }
							</Text>
						</Text>
					</TouchableHighlight>
				))} */}

				<Text style={styles.p}>
					{ networkInfo == 'offline' ? 'Maak verbinding met internet'  : 'Loading ...' }
				</Text>

				<Text style={[styles.statuswifi, styles[networkStatus] ]}>	
					{ networkInfo == 'offline' ? 'Geen verbinding'  : 'Verbonden met ' + networkInfo }
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
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
	p: {
		color: '#EE9900',
		fontWeight: 'bold',
		fontSize: 16,
		margin: 16,
	},
	small: {
		color: '#636363',
		fontSize: 11,
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
	},
	button: {
		padding: 8,
		margin: 4,
	},
	// Status network
	offline: {
		backgroundColor: '#CC0077',
	},
	online: {
		backgroundColor: '#BCCD13',
	},
	// Status permission
	undetermined: {
		backgroundColor: '#E0E0E0',
	  },
	  authorized: {
		backgroundColor: '#BBCC00',
		borderColor: '#BBCC00',
	  },
	  denied: {
		backgroundColor: '#CC0077',
	  },
	  restricted: {
		backgroundColor: '#ef9a9a',
	  },
});

export default Home;