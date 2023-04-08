import AsyncStorage from '@react-native-async-storage/async-storage';

const storageFavorite = async (value) => {
  try {
    await AsyncStorage.setItem('favorite', JSON.stringify(value))
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

const getFavorite = async () => {
  try {
    const res = JSON.parse(await AsyncStorage.getItem('favorite'))
    return res
  } catch (error) {
   console.log(error);
   return 0;
  }
};

const clearFavorite = async () => {
  try {
    const res = await AsyncStorage.removeItem('favorite')
    return res;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export {storageFavorite, getFavorite, clearFavorite}