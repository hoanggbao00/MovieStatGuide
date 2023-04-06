import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import colors from '../ultis/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFakeDetail } from '../ultis/fakedata';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function MovieDetail(props) {
	// const { route } = props;
	// const { movieData } = route.params;
	const movieData = getFakeDetail;
	return (
		<View style={styles.mainView}>
			<Image
				style={styles.bannerImage}
				source={{ uri: movieData.posters.backdrops[0].link }}
			/>
			<Image
				style={styles.posterView}
				source={{ uri: movieData.posters.posters[0].link }}
			/>
			<View style={styles.detailView}>
				<Text style={styles.movieName}>
					{movieData.title || movieData.name}
				</Text>
				<Text style={styles.movieVote}>
					Rating:{' '}
					{`${movieData.imDbRating} (${movieData.imDbRatingVotes} vote)`}
				</Text>
				<View style={styles.infoView}>
					<Text style={styles.divider}></Text>
					<View style={styles.textInfo}>
						<Text style={styles.infoTitle}>Release date:</Text>
						<Text style={styles.infoContent}>
							{movieData.releaseDate || movieData.first_air_date}
						</Text>
					</View>
					<View style={styles.textInfo}>
						<Text style={styles.infoTitle}>Description:</Text>
						<Text style={{ ...styles.infoContent, ...styles.moviePlot }}>
							{movieData.plot}
						</Text>
					</View>
					<View style={styles.actorView}>
						<Text style={styles.infoTitle}>Actor</Text>
						<ScrollView
							contentContainerStyle={{justifyContent: 'center'}}
							horizontal={true}
							style={styles.actorList}
						>
							{movieData.actorList.map((actor) => (
								<View key={actor.id} style={styles.actorItem}>
									<Image
										style={styles.actorImage}
										source={{ uri: actor.image }}
									/>
									<Text style={styles.actorName}>{actor.name}</Text>
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		position: 'relative',
		backgroundColor: colors.darkColor,
	},
	bannerImage: {
		flex: 1,
		resizeMode: 'cover',
	},
	detailView: {
		flex: 2,
		position: 'relative',
	},
	posterView: {
		position: 'absolute',
		top: 130,
		left: 15,
		width: 130,
		height: 200,
		borderRadius: 10,
	},
	movieName: {
		color: '#fff',
		maxHeight: 100,
		marginLeft: 150,
		overflow: 'hidden',
		fontWeight: 'bold',
		fontSize: 20,
		padding: 5,
		paddingBottom: 0,
	},
	movieVote: {
		color: '#fff',
		marginLeft: 150,
		padding: 5,
		color: 'yellow',
		fontSize: 14
	},
	movieLanguage: {
		color: '#fff',
	},
	divider: {
		color: '#fff',
		width: '100%',
		height: 2,
		backgroundColor: '#fff',
	},
	infoView: {
		position: 'absolute',
		top: 90,
		left: 0,
		gap: 10,
		padding: 10
	},
	textInfo: {
		flexDirection: 'row',
	},
	infoTitle: {
		color: '#42b883',
		width: 90,
		fontWeight: 'bold',
	},
	infoContent: {
		color: '#fff',
		fontSize: 16,
	},
	moviePlot: {
		height: 100,
		flexWrap: 'wrap',
		width: '75%',
		overflow: 'hidden'
	},
	actorList: {
		flexDirection: 'row',
		gap: 10,
		width: width
	},
	actorItem: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		overflow: 'hidden',
	},
	actorImage: {
		width: 70,
		height: 70,
		borderRadius: 70 / 2,
		resizeMode: 'cover',
	},
	actorName: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 5
	},
	actorView: {},
});
