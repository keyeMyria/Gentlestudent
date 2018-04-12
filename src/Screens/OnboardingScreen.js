import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';

class OnboardingScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Onboarding
				</Text>

				<Button
					title='Overslaan'
					onPress={() => this.props.navigation.navigate('Maps')}
				></Button>
				<Button
					title='Volgende'
					onPress={() => alert('n.v.t.')}
				></Button>
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
		paddingLeft: 16,
		paddingRight: 16,
	},
	p : {
		marginBottom: 8,
	},
	title : {
		marginTop: 8,
		fontWeight: 'bold',
	}
});

export default OnboardingScreen;