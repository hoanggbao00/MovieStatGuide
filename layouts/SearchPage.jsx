import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  Text,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../ultis/Colors';
import ListMovies from './ListMovies';
import {getFakeMovie, getFakeSearchData} from '../ultis/fakedata';
import {useTranslation} from 'react-i18next';
import {searchMovie} from '../ultis/data';

const height = Dimensions.get('window').height;

export default function SearchPage({navigation}) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [found, setFound] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [popularData, setPopularData] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Search');
      getFakeMovie().then(data => {
        const temp = [];
        for (let i = 0; i <= 6; ++i) {
          temp.push(data.items[i]);
        }
        setPopularData(temp);
      });
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = async () => {
    setIsLoading(true);
    // // ! On working...
    getFakeSearchData(query).then(res => {
      if (
        res.results.length === 0 ||
        query === 'test:none' ||
        query.length === 0
      )
        return setFound(false);
      console.log(query);
      const temp = res.results.map(item => item);
      const filteredData = temp.filter(item => item.image !== '');
      setIsLoading(false);
      setData(filteredData);
      return setFound(true);
    });
    // const res = searchMovie(query);
    // res.then(res => {
    //   if (res.results.length === 0 || query === 'test:none')
    //     return setFound(false);
    //   const temp = res.results.map(item => item);
    //   const filteredData = temp.filter(item => item.image !== '');
    //   setData(filteredData);
    //   return setFound(true);
    // });
  };

  const handleChange = e => {
    const value = e.nativeEvent.text;
    if (isLoading === false) setIsLoading(true);

    setQuery(value);
  };

  useEffect(() => {
    if (query.length === 0) return;
    const getData = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(getData);
  }, [query]);

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
        {isLoading === false ? (
          query !== '' ? ( //* query !== '' for reset UI to no search action
            found ? ( //* if found
              <>
                <View style={styles.listText}>
                  <Text style={styles.listTitle}>
                    {`${t('found')} ${data.length} ${t('match')}`}
                  </Text>
                  <Text style={styles.searchValue}>{` "${query}"`}</Text>
                </View>
                <ListMovies
                  title={t('movies')}
                  dataList={data}
                  navigation={navigation}
                />
              </>
            ) : (
              //* if not found any results
              <>
                <View style={styles.listText}>
                  <Text style={styles.listTitle}>{t('notfound')}</Text>
                  <Text style={styles.searchValue}>{` "${query}"`}</Text>
                </View>
              </>
            )
          ) : null
        ) : (
					query !== '' &&
          <>
            <View style={styles.listText}>
              <Text style={styles.listTitle}>{t('searching')}</Text>
              <Text style={styles.searchValue}>{` "${query}"`}</Text>
            </View>
          </>
        )}

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
    height: height - 140,
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
