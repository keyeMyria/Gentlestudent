/**
 * Gentlestudent App
 * Created with: https://github.com/facebook/react-native
 */

import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './src/Screens/Home';
import PrivacyScreen from './src/Screens/PrivacyScreen';
import OnboardingScreen from './src/Screens/OnboardingScreen';
import MapsScreen from './src/Screens/MapsScreen';
import BackpackScreen from './src/Screens/BackpackScreen';

const AppScreens = StackNavigator({
	Home: { screen: Home },
	Privacy: { screen: PrivacyScreen },
	Onboarding: { screen: OnboardingScreen },
	Maps: { screen: MapsScreen },
	Backpack: { screen: BackpackScreen },
})

AppRegistry.registerComponent('Gentlestudent', () => AppScreens)