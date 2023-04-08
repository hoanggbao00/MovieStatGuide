import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../ultis/Colors';
import GridMovies from './GridMovies';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { clearFavorite, getFavorite } from '../ultis/AsyncStorage';

export default function FavoritePage({ navigation }) {
	const [data, setData] = useState({});

	const { t } = useTranslation();
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('Favorite');
			getFavorite().then((res) => {
				const temp = {
					title: t('favorite'),
					...res,
				};
				setData(temp);
			});
		});

		return unsubscribe;
	}, [navigation]);

	const removeAllHandle = () => {
		clearFavorite()
		setData([])
	}

	return (
		<View style={styles.mainView}>
			<View style={styles.header}>
				<Text style={styles.text}>{t('favoriteTitle')}</Text>
			</View>
			<ScrollView style={styles.scrollContainer}>
				{Object.keys(data).length !== 0 ? (
					<>
						<GridMovies data={data} navigation={navigation} more={false} />
						<Button title={t('removeall')} style={{backgroundColor: colors.primaryColor, color: '#fff'}} onPress={removeAllHandle}/>
					</>
				) : (
					<Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{t('emptyfavorite')}</Text>
				)}
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
	header: {
		height: 60,
		width: '100%',
		backgroundColor: colors.darkColor,
	},
	text: {
		fontSize: 24,
		textAlign: 'left',
		color: colors.secondaryColor,
		fontWeight: 'bold',
		padding: 15,
	},
});
