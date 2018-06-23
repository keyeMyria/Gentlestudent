/*
	TODO:
	- cleanup
	- permissies één per één laden
*/

import { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
	NetInfo,
	StyleSheet,
	AppState,
	Alert
} from 'react-native';
import Permissions from 'react-native-permissions';

class PermissionsHome extends Component {
	state = {
		permissionTypes: [],
		permissionStatus: {},
		networkStatus: '',
	}
	componentDidMount() {
		// Get all permissionTypes of connection
		let typez = Permissions.getTypes()

		// Push some of the permissionTypes tot the array (to give permission afterwards)
		let permissionTypes = []
		permissionTypes.push(
			typez[1], //cam
			//typez[7], //ble
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
	componentWillMount() {
		NetInfo.addEventListener(
			'connectionChange',
			this._handleFirstConnectivityChange
		);
	}
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange)
	}

	_handleFirstConnectivityChange = (connectionInfo) => {
		if(connectionInfo.type == 'cellular') {
			console.log('Cellular network: ' + connectionInfo.effectiveType);
			this.setState({ networkStatus: 'online' });
		} else if (connectionInfo.type == 'wifi') {
			console.log('Network: ' + connectionInfo.type);
			this.setState({ networkStatus: 'online' });
		} else {
			console.log('Network: ' + connectionInfo.type);
			this.setState({ networkStatus: 'offline' });
		}
	};

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
				} else if(res == 'authorized') {
				if( this.state.networkStatus == 'online') {
						setTimeout( () => {
							Actions.maps();
						}, 3000);
					}
				}
			})
			.catch( (e) => { console.warn(e) })
	}

	_onLocationSwitchChange = () => {
		this._updatePermissions(this.state.permissionTypes)
	}
	render() {
		return null;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	// Permissions
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

export default PermissionsHome;