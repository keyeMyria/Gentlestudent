import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    StyleSheet,
	View,
	Text,
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
                            {/* <Text>Information</Text> */}
                        </Button>
                        <Button onPress={() => alert("scan")}>
                            <Icon name="compass" /> {/*Temporary icon */}
                            {/* <Text>Scan</Text> */}
                        </Button>
                        <Button onPress={() => Actions.profile()}>
                            <Icon name="contact" />
                            {/* <Text>Profile</Text> */}
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        )
    }
}

export default Navigation;