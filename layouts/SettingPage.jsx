import {
	View,
	Text,
	StyleSheet,
	ToastAndroid,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../ultis/Colors';
import SettingItem from '../components/SettingItem';
import ModalItem from '../components/ModaIteml';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native';
import { storageItem } from '../ultis/AsyncStorage';

export default function SettingPage({ navigation }) {
	const [api, setApi] = useState('')
	const [modalVisible, setModalVisible] = useState({
		about: false,
		version: false,
		language: false,
	});
	const [devMode, setDevMode] = useState(false);
	const onLogout = () => {
		navigation.navigate('login');
	};

	const { t } = useTranslation();

	const showModal = (modal) => {
		if (modal === 'about')
			return setModalVisible({ ...modalVisible, about: true });
		if (modal === 'version')
			return setModalVisible({ ...modalVisible, version: true });
		if (modal === 'language')
			return setModalVisible({ ...modalVisible, language: true });
	};

	const aboutHandle = () => {
		showModal('about');
	};

	const developerModeHandle = () => {
		ToastAndroid.show('DEVOLOPER MODE', ToastAndroid.SHORT);
		setDevMode(!devMode);
	};

	const apiChangeHandle = (e) => {
		setApi(e)
	}

	const setAPI =() => {
		const set = storageItem('@api', api)
		ToastAndroid.show(`API changed to ${api}`, ToastAndroid.SHORT)
	}

	const resetAPI =() => {
		const oldapi = 'k_gzylax6m'
		const set = storageItem('@api', oldapi)
		ToastAndroid.show(`API changed to k_gzylax6m`, ToastAndroid.SHORT)
	} 

	const themeHandle =() => {
		
		ToastAndroid.show(t('commingsoon'), ToastAndroid.SHORT)
	} 

	const versionHandle = () => {
		showModal('version');
	};

	const languageHandle = () => {
		showModal('language');
	};

	const openUrl = async (url) => {
		const supported = await Linking.canOpenURL(url);

		if (supported) return await Linking.openURL(url);
		if (!supported) Alert.alert(`Don't know how to open this URL: ${url}`);
	};

	const apiHandle = () => {
		const url = 'https://imdb-api.com/';

		openUrl(url);
	};

	const gitHubHandle = () => {
		const url = 'https://github.com/hoanggbao00/MovieStatGuide';

		openUrl(url);
	};

	return (
		<ScrollView id="setting-page" style={styles.mainView}>
			<View style={styles.header}>
				<Text style={styles.headerText}>{t('settingTitle')}</Text>
			</View>
			<ScrollView style={styles.mainContainer}>
				<View style={{ height: '100%' }}>
					<View style={styles.session}>
						<Text style={styles.sessionText}>{t('userSection')}</Text>
						<SettingItem
							icon="log-in-outline"
							name={t('login')}
							pressEvent={onLogout}
						/>
						<SettingItem
							icon="log-out-outline"
							name={t('logout')}
							pressEvent={onLogout}
						/>
					</View>
					<View style={styles.session}>
						<Text style={styles.sessionText}>{t('applicationSection')}</Text>
						<SettingItem
							icon="earth-outline"
							name={t('language')}
							pressEvent={languageHandle}
						/>
						<SettingItem icon="contrast-outline" name={t('theme')} pressEvent={themeHandle} />
						<SettingItem
							icon="code-outline"
							name={t('devmode')}
							pressEvent={developerModeHandle}
						/>
						{devMode && (
							<View style={{ flexDirection: 'row', gap: 10 }}>
								<TextInput
									value={api}
									placeholder="API KEY"
									style={{ width: '70%' }}
									onChangeText={apiChangeHandle}
								/>
								<TouchableOpacity
									style={{
										backgroundColor: colors.primaryColor,
										paddingVertical: 10,
										paddingHorizontal: 10,
										justifyContent: 'center',
										alignContent: 'center',
										borderRadius: 10,
									}}
									onPress={setAPI}
								>
									<Text>SET</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										backgroundColor: colors.primaryColor,
										paddingVertical: 10,
										paddingHorizontal: 10,
										justifyContent: 'center',
										alignContent: 'center',
										borderRadius: 10,
									}}
									onPress={resetAPI}
								>
									<Text>RESET</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
					<View style={styles.session}>
						<Text style={styles.sessionText}>{t('aboutSection')}</Text>
						<SettingItem
							icon="information"
							name={t('about')}
							pressEvent={aboutHandle}
						/>
						<SettingItem
							icon="phone-portrait-outline"
							name={t('version')}
							pressEvent={versionHandle}
						/>
						<SettingItem
							icon="laptop-outline"
							name="API"
							pressEvent={apiHandle}
						/>
						<SettingItem
							icon="logo-github"
							name="Github"
							pressEvent={gitHubHandle}
						/>
					</View>
				</View>
			</ScrollView>
			{modalVisible.about === true && (
				<ModalItem type={'about'} setState={setModalVisible} />
			)}
			{modalVisible.version === true && (
				<ModalItem type={'version'} setState={setModalVisible} />
			)}
			{modalVisible.language === true && (
				<ModalItem type={'language'} setState={setModalVisible} />
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		backgroundColor: colors.darkColor,
	},
	header: {
		height: 60,
		width: '100%',
	},
	headerText: {
		fontSize: 24,
		textAlign: 'left',
		color: colors.secondaryColor,
		fontWeight: 'bold',
		padding: 15,
	},
	mainContainer: {
		height: '100%',
		backgroundColor: colors.purpleColor,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 10,
	},
	session: {
		flexDirection: 'column',
		width: '100%',
		marginBottom: 30,
	},
	sessionText: {
		fontSize: 18,
		color: colors.secondaryColor,
		fontWeight: 'bold',
	},
});
