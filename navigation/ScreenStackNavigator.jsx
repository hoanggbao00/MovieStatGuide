import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../layouts/Navbar';
import MovieDetail from '../layouts/MovieDetail';
import SearchPage from '../layouts/SearchPage';
import FavoritePage from '../layouts/FavoritePage';

const Stack = createStackNavigator();

export default function ScreenStackNavigator() {

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
				
			/>
		</Stack.Navigator>
	);
}
