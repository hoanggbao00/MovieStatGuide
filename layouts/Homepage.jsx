import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import colors from '../ultis/Colors';
import GridMovies from './GridMovies';
import { t } from 'i18next';
import { getFakeMovie, getFakeTV } from '../ultis/fakedata';

export default function Homepage(props) {
	const { navigation } = props;
	const [data, setData] = useState([]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
		console.log('home');

			const temp = [];
			getFakeMovie().then((res) => {
				temp.push({
					title: t('popularMovies'),
					...res,
				});
	
				getFakeTV().then((res) => {
					temp.push({
						title: t('tvShow'),
						...res,
					});
				});
				
				setData(temp)
			});
		})

		return unsubscribe
		
	}, [navigation]);

	return (
		<View style={styles.mainView}>
			<Banner navigation={navigation} />
			<ScrollView style={styles.scrollContainer}>
				{data.map((item,index) => <GridMovies key={index} data={item} navigation={navigation} />)}
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
