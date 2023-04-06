import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import React, { useState } from 'react';
import ListItem from '../components/ListItem';
import { useTranslation } from 'react-i18next';

export default function ListMovies({ title, dataList, navigation }) {
	const [page, setPage] = useState(1);
	const [more, setMore] = useState(true)
	const ITEMSHOW = 6;

	const showMore = () => {
		if(page * ITEMSHOW >= dataList.length) return setMore(false)
		setPage(page + 1);
	};
	const {t} = useTranslation()

	return (
		<View style={styles.listMovies}>
			<View style={styles.listText}>
				<Text style={styles.listTitle}>{title}</Text>
			</View>
			<View style={styles.listContainer}>
				{dataList &&
					dataList.map((movie, index) => {
						if (index >= page * ITEMSHOW) return;
						return <ListItem key={movie.id} movie={movie} navigation={navigation} />;
					})}
			</View>
			{(more && !(page*ITEMSHOW >= dataList.length)) && (
				<TouchableOpacity onPress={showMore}>
					<Text style={{ textAlign: 'center', fontSize: 16, color: '#fff' }}>
						{`${t('listMore')} (${page*ITEMSHOW}/${dataList.length} ${t('result')})`}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	listMovies: {
		marginBottom: 20,
	},
	listText: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 15,
	},
	listTitle: {
		color: 'white',
	},
	searchValue: {
		fontWeight: 'bold',
		color: 'white',
	},
	listContainer: {
		padding: 10,
	},
});
