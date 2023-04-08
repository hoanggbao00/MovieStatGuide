import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ListItem({ movie, navigation }) {
	const toDetail = () => {
		if(!navigation) return
		if (!movie) return

		navigation.navigate('detail',{
			movieData: movie,
			headerTitle: movie.title || movie.name,
			movie: movie,
			isFavorite: true
		})
	}

	return (
		<TouchableOpacity style={styles.listItem} onPress={() => toDetail()}>
			<Image
				style={styles.image}
				source={{ uri: movie.image}}
			/>
			<Text style={styles.text}>{movie.title || movie.name}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItem: {
		flexDirection: 'row',
		width: '100%',
		height: 70,
		alignItems: 'center',
		marginBottom: 10,
	},
	image: {
		width: 50,
		height: 70,
	},
	text: {
		color: '#fff',
		marginLeft: 20,
		height: 40,
		overflow: 'hidden',
	},
});
