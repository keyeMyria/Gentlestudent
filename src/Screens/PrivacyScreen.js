import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';

class PrivacyScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>
					Last updated: 16/01/2018
				</Text>
				<Text style={styles.p}>
					This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
				</Text>
				<Text style={styles.p}>
					We use your Personal Information only for providing and improving the Site. By using the Site, you
					agree to the collection and use of information in accordance with this policy.
				</Text>
				<Text style={styles.title}>Information Collection And Use</Text>
				<Text style={styles.p}>
					While using our Site, we may ask you to provide us with certain personally identifiable information
					that can be used to contact or identify you. Personally identifiable information may include, but is not
					limited to your name (“Personal Information”).
				</Text>
				<Text style={styles.title}>Log Data</Text>
				<Text style={styles.p}>
					Like many site operators, we collect information that your browser sends whenever you visit our Site
					(“Log Data”).
					This Log Data may include information such as your computer’s Internet Protocol (“IP”) address,
					browser type, browser version, the pages of our Site that you visit, the time and date of your visit,
					the time spent on those pages and other statistics.
					In addition, we may use third party services such as Google Analytics that collect, monitor and
				</Text>
				<Button
					title='Accepteren'
					onPress={() => this.props.navigation.navigate('Onboarding')}
				></Button>
				<Button
					title='Afwijzen'
					onPress={() => alert('Als u ons app wilt gebruiken moet u dit accepteren.')}
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

export default PrivacyScreen;