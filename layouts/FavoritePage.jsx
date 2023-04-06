import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../ultis/Colors';
import GridMovies from './GridMovies';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';


export default function FavoritePage({ navigation }) {
const {t} = useTranslation()


	return (
		<View style={styles.mainView}>
			<View style={styles.header}>
				<Text style={styles.text}>{t('favoriteTitle')}</Text>
			</View>
			<ScrollView style={styles.scrollContainer}>
				<GridMovies type="popular" navigation={navigation} more={false} />
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
