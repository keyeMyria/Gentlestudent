import React, { Component } from 'react';

import { Root, Container } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from './src/Screens/HomeScreen';
import MapsScreen from './src/Screens/MapsScreen';
import PrivacyScreen from './src/Screens/PrivacyScreen';
import OnboardingScreen from './src/Screens/OnboardingScreen';
import BackpackScreen from './src/Screens/BackpackScreen';

export default class App extends Component {
	render() {
		return (
			<Root>
				<Container>
					<Router navigationBarStyle={{
						marginTop: 20,
						backgroundColor:'white',
						shadowOffset: {
							width: 0,
							height: 0
						},
						shadowOpacity: .35,
						elevation: 0
					}} >
						{
						/* BACK BUTTON DISABLED =>
						No duration/panHandlers support:
						you have to implement custom navigator now instead and pass it as ‘navigator’
						prop https://reactnavigation.org/docs/navigators/custom.
						You could still pass panHandlers={null} to disable gestures or gesturedEnabled={false} */}
						<Scene key="root" hideNavBar={false} swipeEnabled={false}>
							<Scene
								key ="home"
								component={HomeScreen}
								title="Home"
								hideNavBar={true}
								panHandlers={null}
							/>
							<Scene
								key ="maps"
								component={MapsScreen}
								title="Maps"
								hideNavBar={true}
								panHandlers={null}
							/>
							<Scene
								key ="privacy"
								component={PrivacyScreen}
								title="Voorwaarden & Privacybeleid"
							/>
							<Scene
								key ="onboarding"
								component={OnboardingScreen}
								title="Onboarding"
								hideNavBar={true}
							/>
						</Scene>
					</Router>
				</Container>
			</Root>
		);
	}
}
