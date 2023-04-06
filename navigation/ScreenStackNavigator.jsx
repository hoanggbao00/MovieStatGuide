import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../layouts/Navbar';
import MovieDetail from '../layouts/MovieDetail';
import colors from '../ultis/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import SearchPage from '../layouts/SearchPage';
import FavoritePage from '../layouts/FavoritePage';
import { ToastAndroid } from 'react-native';

const Stack = createStackNavigator();

export default function ScreenStackNavigator() {
	const [isFavorite, setIsFavorite] = useState(false)
	const favoriteHandle = (state) => {
		ToastAndroid.show('Favorite', ToastAndroid.SHORT)
		setIsFavorite(state)
	}

	return (
		<Stack.Navigator initialRouteName="main">
			<Stack.Screen
				name="home"
				component={Navbar}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="search"
				component={SearchPage}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="favorite"
				component={FavoritePage}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="detail"
				component={MovieDetail}
				options={({ route, navigation }) => ({
					title: route.params.headerTitle || 'Detail',
					headerStyle: {
						backgroundColor: colors.primaryColor,
						borderBottomWidth: 0,
					},
					headerTintColor: colors.secondaryColor,
					headerLeft: () => (
						<Ionicons
							name="chevron-back-outline"
							size={30}
							color={colors.secondaryColor}
							onPress={() => navigation.goBack()}
						/>
					),
					headerRight: () => {
						let iconName = '';
						if (isFavorite === true) iconName = 'bookmark'
						else iconName = 'bookmark-outline';

						return <Ionicons name={iconName} size={30} color='#ffffff' style={{marginRight: 20}} onPress={() => {
							favoriteHandle(!isFavorite);
						}}/>
				}
				})}
			/>
		</Stack.Navigator>
	);
}
