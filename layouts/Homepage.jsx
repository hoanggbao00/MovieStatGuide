import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import colors from '../ultis/Colors';
import GridMovies from './GridMovies';
import { getFakeMovie, getFakeTV } from '../ultis/fakedata';
import { useTranslation } from 'react-i18next';

export default function Homepage(props) {
	const { navigation } = props;
	const [data, setData] = useState([]);
	const { t } = useTranslation();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('home');
			getFakeMovie().then((res1) => {
				const obj1 = {
					title: t('popularMovies'),
					...res1,
				};

				getFakeTV().then((res2) => {
					const obj2 = {
						title: t('tvShow'),
						...res2,
					};
					setData([obj1,obj2]);
				});
			});
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View style={styles.mainView}>
			<Banner navigation={navigation} />
			<ScrollView style={styles.scrollContainer}>
				{data
					? data.map((item, index) => (
							<GridMovies key={index} data={item} navigation={navigation} />
					  ))
					: null}
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
