import { View, Text, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import React, { useState } from 'react';
import colors from '../ultis/Colors';
import SettingItem from '../components/SettingItem';
import ModalItem from '../components/ModaIteml';
import { Linking } from 'react-native';

export default function SettingPage({ navigation }) {
	const [modalVisible, setModalVisible] = useState({
		about: false,
		version: false,
		language: false,
	});
	const onLogout = () => {
		navigation.navigate('login');
	};

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
		ToastAndroid.show('Comming soon...', ToastAndroid.SHORT);
	};

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
		const url = 'https://github.com/hoanggbao00/MovieStatMobile';

		openUrl(url);
	};

	return (
		
		<ScrollView id="setting-page" style={styles.mainView}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Settings</Text>
			</View>
			<ScrollView style={styles.mainContainer}>
				<View style={{ height: '100%' }}>
					<View style={styles.session}>
						<Text style={styles.sessionText}>User</Text>
						<SettingItem
							icon="log-in-outline"
							name="Login"
							pressEvent={onLogout}
						/>
						<SettingItem
							icon="log-out-outline"
							name="Logout"
							pressEvent={onLogout}
						/>
					</View>
					<View style={styles.session}>
						<Text style={styles.sessionText}>Application</Text>
						<SettingItem
							icon="earth-outline"
							name="Language"
							pressEvent={languageHandle}
						/>
						<SettingItem icon="contrast-outline" name="Theme" />
						<SettingItem
							icon="code-outline"
							name="Developer mode"
							pressEvent={developerModeHandle}
						/>
					</View>
					<View style={styles.session}>
						<Text style={styles.sessionText}>About</Text>
						<SettingItem
							icon="information"
							name="About"
							pressEvent={aboutHandle}
						/>
						<SettingItem
							icon="phone-portrait-outline"
							name="Version"
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
