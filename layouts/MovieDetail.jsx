import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../ultis/Colors';
import Icon from'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getFavorite } from '../ultis/AsyncStorage';
import { ToastAndroid } from 'react-native';
import { storageFavorite } from '../ultis/AsyncStorage';
import { getDetail } from '../ultis/data';

const width = Dimensions.get('window').width;

export default function MovieDetail(props) {
	const { route, navigation } = props;
	const { id } = route.params.movieData;
	const { t } = useTranslation();
	const [movieData, setMovieData] = useState({});
	const [headerTitle, setHeaderTitle] = useState(movieData.title);
	const [favoriteState, setFavoriteState] = useState(false);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDetail(id).then((data) => {
				setMovieData(data);
				setHeaderTitle(data.title)
			});
		})
		return unsubscribe;
	}, [navigation])

	useEffect(() => {
		getFavorite().then((data) => {
			if (!data) return setFavoriteState(false);
			const isFavorite = data.items.find((item) => item.id === movieData.id);
			if (isFavorite) setFavoriteState(true);
			else setFavoriteState(false);
		});
	}, [movieData])

	useEffect(() => {
		props.navigation.setOptions({
			title: headerTitle || 'Detail',
			headerStyle: {
				backgroundColor: colors.primaryColor,
				borderBottomWidth: 0,
			},
			headerTintColor: colors.secondaryColor,
			headerLeft: () => (
				<Icon
					name="chevron-back-outline"
					size={30}
					color={colors.secondaryColor}
					onPress={() => navigation.goBack()}
				/>
			),
			headerRight: () => {
				let iconName = '';

				if (favoriteState) iconName = 'bookmark';
				else iconName = 'bookmark-outline';
				return (
					<Icon
						name={iconName}
						size={30}
						color="#ffffff"
						style={{ marginRight: 20 }}
						onPress={() => favoriteHandle()}
					/>
				);
			},
		});
	}, [headerTitle, navigation, favoriteState, movieData]);

	const favoriteHandle = () => {
		const obj = {
			id: movieData.id,
			title: movieData.title,
			image: movieData.image,
			year: movieData.year,
		};

		const res = getFavorite();
		res.then((current) => {
			if (current !== null) {
				//* if already have data
				const checkIndex = current.items.findIndex(
					(item) => item.id === obj.id
				);
				if (checkIndex === -1) {
					current.items.push(obj);
					const storaged = storageFavorite(current);
					if (storaged)
						ToastAndroid.show(`Added ${obj.title} `, ToastAndroid.SHORT);
				} else {
					current.items.splice(checkIndex, 1);
					const storaged = storageFavorite(current);
					if (storaged)
						ToastAndroid.show(`Removed ${obj.title} `, ToastAndroid.SHORT);
				}
			} else {
				//* if data is empty
				const storaged = storageFavorite({ items: [obj] });
				if (storaged)
					ToastAndroid.show(`Added ${obj.title} `, ToastAndroid.SHORT);
			}
		});

		setFavoriteState(!favoriteState);
	};

	return (
		<View style={styles.mainView}>
			{Object.keys(movieData).length !== 0 ? movieData ? (
				<>
					<Image
						style={styles.bannerImage}
						source={{ uri: movieData.posters.backdrops.length === 0 ? movieData.image : movieData.posters.backdrops[0].link}}
					/>
					<Image
						style={styles.posterView}
						source={{ uri: movieData.posters.posters.length === 0 ? movieData.image : movieData.posters.posters[0].link}}
					/>
					<View style={styles.detailView}>
						<Text style={styles.movieName}>
							{movieData.title || movieData.name}
						</Text>
						<Text style={styles.movieVote}>
							{t('rating')}:
							{` ${movieData.imDbRating} (${movieData.imDbRatingVotes} ${t(
								'vote'
							)})`}
						</Text>
						<View style={styles.infoView}>
							<Text style={styles.divider}></Text>
							<View style={styles.textInfo}>
								<Text style={styles.infoTitle}>{t('releasedate')}:</Text>
								<Text style={styles.infoContent}>
									{movieData.releaseDate || movieData.first_air_date}
								</Text>
							</View>
							<View style={styles.textInfo}>
								<Text style={styles.infoTitle}>{t('description')}:</Text>
								<Text style={{ ...styles.infoContent, ...styles.moviePlot }}>
									{movieData.plot}
								</Text>
							</View>
							<View style={styles.actorView}>
								<Text style={styles.infoTitle}>{t('actor')}</Text>
								<ScrollView
									contentContainerStyle={{ justifyContent: 'center' }}
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
							<TouchableOpacity
								onPress={async () => {
									const url = `https://www.imdb.com/title/${movieData.id}/`;
									const supported = await Linking.canOpenURL(url);
									if (supported) return Linking.openURL(url);
									Alert.alert(`Don't know how to open this URL: ${url}`);
								}}
								style={{
									width: '100%',
									justifyContent: 'center',
									paddingVertical: 10,
									backgroundColor: colors.primaryColor,
									marginTop: 10,
								}}
							>
								<Text
									style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
								>
									{t('opendetail')}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			) : null : null}
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
		fontSize: 14,
	},
	movieLanguage: {
		color: '#fff',
	},
	divider: {
		color: '#fff',
		width: '100%',
		height: 2,
		backgroundColor: '#fff',
		marginBottom: 5,
		marginTop: 5,
	},
	infoView: {
		position: 'absolute',
		top: 80,
		left: 0,
		padding: 10,
	},
	textInfo: {
		flexDirection: 'row',
	},
	infoTitle: {
		color: '#42b883',
		width: 90,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	infoContent: {
		color: '#fff',
		fontSize: 16,
	},
	moviePlot: {
		height: 100,
		flexWrap: 'wrap',
		width: '75%',
		overflow: 'hidden',
	},
	actorList: {
		flexDirection: 'row',
		gap: 10,
		width: width,
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
		marginTop: 5,
	},
	actorView: {},
});
