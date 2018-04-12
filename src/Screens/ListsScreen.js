import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
	StyleSheet,
	Alert,
	Image,
} from 'react-native';
import {
	Header,
	Body,
	Segment,
	Left,
	Right,
	Icon,
	Button,
	Text,
	Container,
	Content,
	List,
	ListItem,
	Thumbnail
} from 'native-base';

import global from './../global';

class ListsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//seg,
			leerkansen: []
		}
	}
	componentWillMount() {
		fetch('https://gentlestudent-api.herokuapp.com/api/v1/leerkans')
			.then(res => res.json())
			.then(data => this.setState({ leerkansen: data }));
	}
	render() {
		const {
			// seg,
			leerkansen,
		} = this.state;
		return (
			<Container style = {styles.container}>
				<Header>
					<Left>
						<Image
							style={{width: 40, height: 40}}
							source={require('./../assets/logo.png')}
						/>
					</Left>
					<Body>
						<Segment>
							<Button
								first
								onPress={() => Actions.replace('maps')}
							>
								<Text>Kaart</Text>
							</Button>
							<Button
								last
								active
							>
								<Text>Lijst</Text>
							</Button>
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
				</Header>
				<Content padder>
					<List>
						{leerkansen.map(lk => {
							return(
								<ListItem>
									<Thumbnail
										square size={80}
										source={require('./../assets/logo.png')}
									/>
									<Body>
										<Text>{lk.title}</Text>
										<Text note>{lk.synopsis}</Text>
									</Body>
								</ListItem>
							)
						})}
					</List>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
});

export default ListsScreen;