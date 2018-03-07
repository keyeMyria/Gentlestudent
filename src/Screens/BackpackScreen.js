import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';

class BackpackScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Backpack',
	});
	render() {
		return (
			<View style={styles.container}>
				<Text>Backpack</Text>
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
	}
})

export default BackpackScreen;