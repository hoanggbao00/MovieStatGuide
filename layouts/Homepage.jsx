import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Banner from '../components/Banner';
import colors from '../ultis/Colors';
import GridMovies from './GridMovies';

export default function Homepage(props) {
	const {navigation} = props

	return (
		<View style={styles.mainView}>
			<Banner navigation={navigation}/>
			<ScrollView style={styles.scrollContainer}>
				<GridMovies type="popular" navigation={navigation}/>
				<GridMovies type="tv_shows" navigation={navigation}/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.darkColor,
	},
	scrollContainer: {
		height: 500,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
});
