import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { View } from 'react-native';
import './i18n/i18n';

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<NavigationContainer>
				<MainStackNavigator />
			</NavigationContainer>
		</View>
	);
}
