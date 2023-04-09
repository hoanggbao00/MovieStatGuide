import {
	View,
	Text,
	Alert,
	StyleSheet,
	Pressable,
	Modal,
	TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';

import {
	Row,
	Rows,
	Table,
	TableWrapper,
} from 'react-native-table-component';
import colors from '../ultis/Colors';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { ToastAndroid } from 'react-native';

export default function ModalItem({ type, setState }) {
	const [modalVisible, setModalVisible] = useState(true);
	const { t, i18n } = useTranslation();
	const [checked, setChecked] = useState(i18n.language);

	const changeLanguage = (language) => {
		if (checked === language) return;
		setChecked(language);
		i18n.changeLanguage(language);
		ToastAndroid.show(t('switchLanguage'), ToastAndroid.SHORT);
	};

	const member = {
		tableHead: ['MSV', t('fullname')],
		tableData: [
			['20201404', 'Đinh Ngọc Anh'],
			['20200830', 'Hoàng Kim Phượng'],
			['20200462', 'Vương Đình Hoàng'],
			['20201087', 'Nguyễn Văn Cương'],
			['20201193', 'Nguyễn Văn Duy'],
			['20201733', 'Nguyễn Hải Tiến'],
		],
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed');
				setModalVisible(!modalVisible);
			}}
		>
			<View style={styles.container}>
				<View style={styles.modalView}>
					{type === 'about' && (
						<>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<Text style={styles.heading2}>EAUT</Text>
								<Text style={styles.heading2}>CNTT11.10.05</Text>
								<Text style={styles.heading2}>Nhóm 5</Text>
							</View>
							<View style={styles.divider}></View>

							<Text style={styles.heading}>{t('members')}</Text>
							<View style={styles.divider}></View>
							<Table
								style={styles.wrapper}
								borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}
							>
								<Row
									style={styles.head}
									data={member.tableHead}
									textStyle={styles.tableText}
									flexArr={[1, 2]}
								/>
								<TableWrapper style={{ flexDirection: 'row' }}>
									<Rows
										style={styles.row}
										data={member.tableData}
										flexArr={[1, 2, 3]}
										textStyle={styles.tableText}
									/>
								</TableWrapper>
							</Table>
						</>
					)}
					{type === 'version' && (
						<>
							<Text style={styles.heading}>{t('version')}</Text>
							<View style={styles2.row}>
								<Text style={styles2.title}>App: </Text>
								<Text style={styles2.text}>
									{require('../package.json').version}
								</Text>
							</View>
							<View style={styles2.row}>
								<Text style={styles2.title}>API: </Text>
								<Text style={styles2.text}>1.9.0</Text>
							</View>
							<View style={styles2.row}>
								<Text style={styles2.title}>React Native: </Text>
								<Text style={styles2.text}>
									{require('../package.json').dependencies['react-native']}
								</Text>
							</View>
						</>
					)}
					{type === 'language' && (
						<>
							<Text style={styles.heading}>LANGUAGE</Text>

							<TouchableOpacity
								style={{
									width: '40%',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
								onPress={() => changeLanguage('en')}
							>
								<Text style={{ fontSize: 16, color: 'black' }}>English</Text>
								<RadioButton.Android
									value="en"
									status={checked === 'en' ? 'checked' : 'unchecked'}
									onPress={() => changeLanguage('en')}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									width: '40%',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
								onPress={() => changeLanguage('vi')}
							>
								<Text style={{ fontSize: 16, color: 'black' }}>Tiếng Việt</Text>
								<RadioButton.Android
									value="vi"
									status={checked === 'vi' ? 'checked' : 'unchecked'}
									onPress={() => changeLanguage('vi')}
								/>
							</TouchableOpacity>
						</>
					)}
					<Pressable
						style={styles.button}
						onPress={() => {
							setModalVisible(!modalVisible);
							setState({ about: false, version: false, language: false });
						}}
					>
						<Text style={styles.textButton}>{t('close')}</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		padding: 16,
		paddingTop: 30,
	},
	centerdView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		paddingBottom: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '100%',
	},
	heading: { fontWeight: 'bold', fontSize: 20, paddingVertical: 10 , color: 'black'},
	heading2: { fontWeight: 'bold', fontSize: 18, paddingVertical: 5 , color: 'black'},
	divider: {
		backgroundColor: '#000',
		height: 2,
		width: '100%',
		marginTop: 5,
		marginBottom: 5,
	},
	head: { height: 40, backgroundColor: '#f1f8ff' },
	row: {
		height: 28,
		backgroundColor: 'white',
	},
	tableText: {
		textAlign: 'center',
		color: 'black'
	},
	button: {
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		elevation: 2,
		backgroundColor: colors.primaryColor,
		marginTop: 10,
	},
	textButton: {
		color: 'white',
		fontSize: 16,
	},
	wrapper: {
		width: '100%',
	},
	stt: {
		backgroundColor: 'white',
		flex: 1,
	},
});

const styles2 = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginTop: 10,
	},
	title: {
		fontWeight: '800',
		fontSize: 18,
		color: 'black'
	},
	text: {
		fontSize: 18,
		color: 'black'
	},
});
