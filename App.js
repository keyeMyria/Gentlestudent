import React, { Component } from 'react';

import { Root, Container } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';

import HomeScreen from './src/Screens/HomeScreen';
import MapsScreen from './src/Screens/MapsScreen';
import ListsScreen from './src/Screens/ListsScreen';
import PrivacyScreen from './src/Screens/PrivacyScreen';
import OnboardingScreen from './src/Screens/OnboardingScreen';
import BackpackScreen from './src/Screens/BackpackScreen';

import { Provider } from 'react-redux';
import {
	createStore,
	applyMiddleware,
	combineReducers,
	compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/reducers';
import sagas from './src/sagas/';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
	sagaMiddleware,
	thunkMiddleware,
	createLogger({
		collapsed: true,
		predicate: (getState, action) => __DEV__,
		predicate: (getState, action) => !action.type.includes('@@redux-form')
	})
);

const store = createStore(
	combineReducers({ ...reducers }),
	middleware,
);

sagaMiddleware.run(sagas);

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Provider store={store}>
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
									/>
									<Scene
										key ="maps"
										component={MapsScreen}
										title="Maps"
										type='replace'
										hideNavBar={true}
									/>
									<Scene
										key ="list"
										component={ListsScreen}
										title="List"
										type='replace'
										hideNavBar={true}
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
				</Provider>
			</React.Fragment>
		);
	}
}

export default App;
