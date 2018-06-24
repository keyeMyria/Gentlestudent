import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Alert, Image } from 'react-native';
import {
	Body,
	Text,
	Container,
	Content,
	List,
	ListItem,
	Thumbnail
} from 'native-base';

import Header from './../Components/Maps/Header';

// import global from './../global';

class ListsScreen extends Component {
	render() {
		return (
			<Container style = {styles.container}>
				<Header />
				<Content padder>
					<List>
						{this.props.leerkansen.items.map(lk => {
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

export default connect(
	(state) => {
		return {
			leerkansen: state.leerkansen
		};
	},
	(dispatch) => {
		return {
			fetchLeerkansen: () => {
				dispatch(LeerkansenFetch());
			}
		}
	}
)(ListsScreen);