import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import colors from '../ultis/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';


export default function NavButton({ icon, active, text, navigateTo }) {
	const onPressHandle = (e) => {
		console.log(e);
	}
	return (
		<TouchableOpacity onPress={onPressHandle} style={styles.navLink}>
				<Ionicons name={icon} size={30} color={active ? colors.secondaryColor : colors.primaryColor} />
				<Text style={active ? styles.navTextActive : styles.navText}>{text}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	navLink: {
		width: 70,
		height: 70,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	navText: {
		fontSize: 16,
		textAlign: 'center',
		color: colors.primaryColor,
		fontWeight: 'bold',
	},
	navTextActive: {
		fontSize: 16,
		textAlign: 'center',
		color: colors.secondaryColor,
		fontWeight: 'bold',
	},
});
