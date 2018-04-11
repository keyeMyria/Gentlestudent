import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
    Text,
	View,
} from 'react-native';
import {
	Footer,
    FooterTab,
    Button,
    Icon,
} from 'native-base';

class Navigation extends Component {
	render() {
		return (
            <View>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => Actions.info()}>
                            <Icon name="information-circle" />
                        </Button>
                        <Button onPress={() => alert("scan")}>
                            <Icon name="compass" /> {/*Temporary icon */}
                        </Button>
                        <Button onPress={() => Actions.profile()}>
                            <Icon name="contact" />
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        )
    }
}

export default Navigation;