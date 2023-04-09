import AsyncStorage from '@react-native-async-storage/async-storage';

const storageItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

const getStoragedItem = async (key) => {
  try {
    const res = JSON.parse(await AsyncStorage.getItem(key))
    return res
  } catch (error) {
   console.log(error);
   return 0;
  }
};

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

export {storageFavorite, getFavorite, clearFavorite, getStoragedItem, storageItem}