import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import colors from '../ultis/Colors';
import MovieCard from '../components/MovieCard';
import {useTranslation} from 'react-i18next';

const width = Dimensions.get('window').width;

export default function GridMovies({data, navigation}) {
  const [page, setPage] = useState(1);
  const {t} = useTranslation();

  const onMoreclick = () => {
    if (page === 5) return;
    setPage(page + 1);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.gridTitle}>{data.title}</Text>
      <View id="grid-movies" style={styles.grid}>
        {data.items
          ? data.items.map((movie, index) => {
              if (index >= page * 20 - 1) return;
              return (
                <MovieCard
                  key={movie.id}
                  data={movie}
                  navigation={navigation}
                />
              );
            })
          : null}
        {data.items ? (
          data.items.length > 19 && page !== 5 ? (
            <TouchableOpacity
              onPress={() => {
                onMoreclick();
              }}
              style={styles.moreButton}>
              <Text style={styles.moreText}>{t('gridMore')}</Text>
            </TouchableOpacity>
          ) : null
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
    width: width,
  },
  scrollView: {
    padding: 10,
    backgroundColor: colors.purpleColor,
    Height: '100%',
  },
  gridTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
  },
  moreButton: {
    width: '28%',
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
    marginTop: 10,
  },
});
