import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import colors from '../ultis/Colors';
import MovieCard from '../components/MovieCard';
import { getPopularMovies, getPopularTVS } from '../ultis/data';
import { getFakeMovie, getFakeTV } from '../ultis/fakedata';
import { useTranslation } from 'react-i18next';


export default function GridMovies({ type, navigation, more = true }) {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const {t} = useTranslation()
	const category = {
		popular: {
			title: t('popularMovies'),
			data: () => getFakeMovie(),
		},
		tv_shows: {
			title: t('tvShow'),
			data: () => getFakeTV(),
		},
	};
	useEffect(() => {
		try {
			category[type].data().then((result) => {
				setData(result.items);
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	const onMoreclick = () => {
		if (page === 5) return;
		setPage(page + 1);
	};

	return (
		<ScrollView style={styles.scrollView}>
			<Text style={styles.gridTitle}>{category[type].title}</Text>
			<View id="grid-movies" style={styles.grid}>
				{data
					? data.map((movie, index) => {
						if(index >= (page * 20 - 1)) return
							return (
								// <Text>{movie.id}</Text>
								<MovieCard
									key={movie.id}
									data={movie}
									navigation={navigation}
								/>
								
							);
					  })
					: null}
				{more === true && page !== 5 ? (
					<TouchableOpacity
						onPress={() => {
							onMoreclick();
						}}
						style={styles.moreButton}
					>
						<Text style={styles.moreText}>{t('gridMore')}</Text>
					</TouchableOpacity>
				) : null}
			</View>
			<Text style={styles.pageText}>{`${t('page')}: ${page}/5`}</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	grid: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		columnGap: 20,
		rowGap: 15,
		width: '100%',
	},
	scrollView: {
		padding: 15,
		backgroundColor: colors.purpleColor,
		Height: '100%',
	},
	gridTitle: {
		color: '#fff',
		fontSize: 20,
		marginBottom: 10,
	},
	moreButton: {
		width: '30%',
		height: 165,
		backgroundColor: 'black',
		borderRadius: 10,
		opacity: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	moreText: {
		color: '#fff',
		fontSize: 20,
	},
	pageText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 16,
		marginTop: 10
	}
});
