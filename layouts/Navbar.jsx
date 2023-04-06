import { View, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../ultis/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import SearchPage from './SearchPage';
import FavoritePage from './FavoritePage';
import SettingPage from './SettingPage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

export default function Navbar(props) {

	const {t, i18n} = useTranslation()

	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: { backgroundColor: colors.darkColor, height: 70 },
				tabBarLabelStyle: { fontSize: 16 },
				tabBarIcon: ({ focused, color }) => {
					let iconName;

					switch (route.name) {
						case t('home'):
							iconName = focused ? 'home' : 'home';
							break;
						case t('search'):
							iconName = focused ? 'search' : 'search';
							break;
						case t('favorite'):
							iconName = focused ? 'bookmark' : 'bookmark';
							break;
						case t('setting'):
							iconName = focused ? 'settings' : 'settings';
							break;
					}

					return <Ionicons name={iconName} size={30} color={color} />;
				},
				tabBarActiveTintColor: colors.secondaryColor,
				tabBarInactiveTintColor: colors.primaryColor,
			})}
			style={styles.navContainer}
		>
			<Tab.Screen
				name={t('home')}
				component={Homepage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name={t('search')}
				component={SearchPage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name={t('favorite')}
				component={FavoritePage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name={t('setting')}
				component={SettingPage}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	navContainer: {
		height: 70,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		columnGap: 33,
		backgroundColor: colors.purpleColor,
		paddingLeft: 5,
		paddingRight: 5,
		shadowColor: '#fff',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 8,
		shadowOpacity: 0.5,
	},
});
