import { View, StyleSheet, Dimensions, TextInput, ScrollView, Text, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import colors from '../ultis/Colors';
import ListMovies from './ListMovies';
import { getPopular, searchMovie } from '../ultis/data';
import { getFakeMovie, getFakeSearchData } from '../ultis/fakedata';
import { useTranslation } from 'react-i18next';

const height = Dimensions.get('window').height

export default function SearchPage({ navigation }) {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	const [found, setFound] = useState();
	const [popularData, setPopularData] = useState([]);
	const {t} = useTranslation()
	
	useEffect(() => {
		//! on Working ...
		//! Test on fake data
		getFakeMovie().then((data) => {
			const temp = [];
			for (let i = 0; i <= 6; ++i) {
				temp.push(data.items[i]);
			}
			setPopularData(temp);
		});
		//! End test
		// getPopular().then(data => {
		// 	const tempData = []
		// 	for(let i = 0; i<=6; ++i) {
		// 		tempData.push(data.results[i])
		// 	}
		// 	setPopularData(tempData)
		// })
	}, []);


	function debounce(func, timeout = 1000) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(null, args);
			}, timeout);
		};
	}

	const handleSearch = async (value) => {
		//! On working...
		//! Test on fake data
		getFakeSearchData(value).then((res) => {
			if (res.results.length === 0 || value === 'test:none') return setFound(false);
			setData(res.results);
			return setFound(true);
		});
		//! end test
		// const res = searchMovie(query)
		// let tempData = []
		// res.then(data => {
		// 	if(data.results.length === 0) return setFound(false)
		// 	setData(tempData)
		// 	return setFound(true)
		// })
	};


	const debounceSearch = debounce(handleSearch);

	const handleChange = (e) => {
		const value = e.nativeEvent.text

		debounceSearch(value);
		setQuery(value)

	};

	return (
		<View id="search-page" style={styles.mainView}>
			<View style={styles.searchBar}>
				<TextInput
					style={styles.searchInput}
					placeholderTextColor={'grey'}
					onChange={handleChange}
					value={query}
				/>
			</View>
			<ScrollView style={styles.mainContainer}>
				{query !== '' ? ( //* query !== '' for reset UI to no search action
					found ? ( //* if found 
						<>
							<View style={styles.listText}>
								<Text style={styles.listTitle}>
									{`${t('found')} ${data.length} ${t('match')}`}
								</Text>
								<Text
									style={styles.searchValue}
								>{` "${query}"`}</Text>
							</View>
							<ListMovies
								title={t('movies')}
								dataList={data}
								navigation={navigation}
							/>
						</>
					) : ( //* if not found any results
						<>
							<View style={styles.listText}>
								<Text style={styles.listTitle}>{t('notfound')}</Text>
								<Text style={styles.searchValue}>{` "${query}"`}</Text>
							</View>
						</>
					)
				) : null}

				<ListMovies
					title={t('popularMovies')}
					dataList={popularData || null}
					navigation={navigation}
				/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.darkColor,
	},
	searchBar: {
		height: 70,
		width: '100%',
		backgroundColor: colors.purpleColor,
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchInput: {
		height: 50,
		width: '100%',
		backgroundColor: colors.darkColor,
		borderRadius: 50,
		paddingHorizontal: 20,
		color: 'white',
		borderColor: 'transparent',
	},
	mainContainer: {
		height: height-140,
	},
	listText: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},
	listTitle: {
		color: '#fff',
		fontSize: 18,
	},
	searchValue: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 18,
	},
});
