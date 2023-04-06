import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function SettingItem({icon, name, pressEvent}) {

	return (
		<TouchableOpacity style={styles.listItem} onPress={() => {
			if(!pressEvent) return

			pressEvent()
		}}>
			<Ionicons name={icon || "moon-outline"} size={30} color='white' />
			<Text style={styles.text}>{name || 'Settings Item'}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItem: {
		flexDirection: 'row',
		width: '100%',
		height: 30,
		alignItems: 'center',
		marginBottom: 10,
		marginTop: 10,
	},
	text: {
		fontSize: 16,
		marginLeft: 15,
		textAlign: 'center',
		color: 'white',
	},
})
