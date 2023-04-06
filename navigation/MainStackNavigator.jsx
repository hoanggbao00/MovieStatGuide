import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../layouts/LoginPage';
import ScreenStackNavigator from './ScreenStackNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
	return (
		<Stack.Navigator initialRouteName="main">
			<Stack.Screen
				name="login"
				component={LoginPage}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="main"
				component={ScreenStackNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
