import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
  Image,
	ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../ultis/Colors';
import { useTranslation } from 'react-i18next';

export default function LoginPage({ navigation }) {
	const {t} = useTranslation()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			ToastAndroid.show(t('loginmessage'), ToastAndroid.LONG)
		})
		return unsubscribe
	})
	const onContinue = () => {
		navigation.navigate('main');
	};
	return (
		<View style={styles.mainView}>
      <Image style={styles.logoView} source={require('../assets/images/logo.png')}/>
			<TextInput
				style={styles.inputView}
				placeholder={t('username')}
				placeholderTextColor={'grey'}
			/>
			<TextInput
				style={styles.inputView}
				placeholder={t('password')}
				placeholderTextColor={'grey'}
			/>
			<View style={styles.loginBtn}>
				<Text style={styles.loginText}>{t('login')}</Text>
			</View>
			<View style={styles.signUpView}>
				<Text style={{ color: 'grey', fontSize: 16 }}>
				{t('donthaveaccount')} {' '}
				</Text>
				<View>
					<Text style={styles.signUpText}>{t('signup')}</Text>
				</View>
			</View>
      <TouchableOpacity style={styles.continueView} onPress={onContinue}>
        <Text style={{color: colors.primaryColor, fontSize: 16}}>{t('continue')}</Text>
      </TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	mainView: {
		backgroundColor: colors.darkColor,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputView: {
		backgroundColor: '#fff',
		width: '80%',
		height: 40,
		borderColor: 'grey',
		borderWidth: 2,
		paddingHorizontal: 10,
		marginTop: 10,
		fontSize: 18,
		borderRadius: 10,
	},
	loginBtn: {
		backgroundColor: colors.primaryColor,
		padding: 10,
		textAlign: 'center',
		width: '80%',
		marginTop: 10,
		borderRadius: 10,
	},
	loginText: {
		fontSize: 18,
		color: 'white',
    fontWeight: 'bold',
		textAlign: 'center'
	},
	signUpView: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
	},
	signUpText: {
		color: colors.primaryColor,
		fontSize: 16,
		fontWeight: 'bold',
	},
	logoView: {
		width: '80%',
    height: 200,
    resizeMode: 'contain',
	},
  continueView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: '5%',
  }
});
