import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { View } from 'react-native';
import './i18n/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	return (
		<SafeAreaProvider>
		<View style={{ flex: 1 }}>
			<NavigationContainer>
				<MainStackNavigator />
			</NavigationContainer>
		</View>
		</SafeAreaProvider>

	);
}
