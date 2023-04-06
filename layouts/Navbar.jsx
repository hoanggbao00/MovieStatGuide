import { View, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../ultis/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './Homepage';
import SearchPage from './SearchPage';
import FavoritePage from './FavoritePage';
import SettingPage from './SettingPage';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Navbar(props) {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: {backgroundColor: colors.darkColor, height: 70},
				tabBarLabelStyle: {fontSize: 16},
				tabBarIcon: ({ focused, color }) => {
					let iconName;

					switch(route.name) {
						case 'Home':
							iconName = focused ? 'home' : 'home'
							break;
						case 'Search':
							iconName = focused ? 'search' : 'search'
							break;
						case 'Favorite':
							iconName = focused ? 'bookmark' : 'bookmark'
							break;
						case 'Setting':
							iconName = focused ? 'settings' : 'settings'
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
				name="Home"
				component={Homepage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Search"
				component={SearchPage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Favorite"
				component={FavoritePage}
				options={{
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Setting"
				component={SettingPage}
				options={{
					headerShown: false,
				}}
			/>
			{/* <NavButton icon="home" active={active === 'Home' ? true : false} text="Home" /> */}
			{/* <NavButton icon="search" active={active === 'Search' ? true : false} text="Search" />
			<NavButton icon="bookmark" active={active === 'Favorite' ? true : false} text="Favorites" />
			<NavButton icon="settings" active={active === 'Setting' ? true : false} text="Settings" /> */}
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
