import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import { Alert, Image } from 'react-native';
import {
	Header as Head,
	Body,
	Segment,
	Left,
	Right,
	Icon,
	Button,
	Text
} from 'native-base';

class Header extends Component {
  render() {
    return (
      <Head>
        <Left>
          <Image
            style={{width: 40, height: 40}}
            source={require('./../../assets/logo.png')}
          />
        </Left>
        <Body>
          <Segment>
            {Actions.currentScene === 'maps' ? (
              <Button
                first
                active
              >
                <Text>Kaart</Text>
              </Button>
              ):(
              <Button
                first
                onPress={() => Actions.replace('maps')}
              >
                <Text>Kaart</Text>
              </Button>
            )}
              
            {Actions.currentScene === 'list' ? (
              <Button
                last
                active
              >
                <Text>Lijst</Text>
              </Button>
            ) : (
              <Button
                last
                onPress={() => Actions.replace('list')}
              >
                <Text>Lijst</Text>
              </Button>
            )}
          </Segment>
        </Body>
        <Right>
          <Button 
            transparent
            onPress = {() => {
                Alert.alert(
                  'Coming soon..',
                  'Search function coming soon. Stay tuned!',
                  [{ text: 'Cancel', style: 'cancel' }],
                )
              }
            }
          >
            <Icon name="search" />
          </Button>
        </Right>
      </Head>
    )
  }
}

export default Header;
