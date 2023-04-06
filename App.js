import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { View } from 'react-native';
// import { Provider, createStoreHook } from 'react-redux';
// import appReducers from './redux/reducers';

// export const store = createStoreHook(appReducers);

export default function App() {
	return (
		// <Provider store={store}>
			<View style={{ flex: 1 }}>
				<NavigationContainer>
					<MainStackNavigator />
				</NavigationContainer>
			</View>
		// </Provider>
	);
}
