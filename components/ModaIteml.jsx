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
	Col,
	Row,
	Rows,
	Table,
	TableWrapper,
} from 'react-native-table-component';
import colors from '../ultis/Colors';
import { RadioButton } from 'react-native-paper';

export default function ModalItem({ type, setState }) {
	const [modalVisible, setModalVisible] = useState(true);
	const [checked, setChecked] = useState('English');
	const member = {
		tableHead: ['', 'MSV', 'Họ và tên'],
		tableTitle: [1, 2, 3, 4, 5, 6],
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
							<View style={styles.centerdView}>
								<Text style={styles.heading2}>EAUT</Text>
								<Text style={styles.heading2}>CNTT11.10.05</Text>
								<Text style={styles.heading2}>Nhóm 5</Text>
							</View>
							<Text style={styles.heading}>DANH SÁCH THÀNH VIÊN</Text>
							<View style={styles.divider}></View>
							<Table
								style={styles.wrapper}
								borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}
							>
								<Row
									style={styles.head}
									data={member.tableHead}
									textStyle={styles.tableText}
									flexArr={[1, 2, 3]}
								/>
								<TableWrapper style={{ flexDirection: 'row' }}>
									<Col
										style={styles.stt}
										data={member.tableTitle}
										heightArr={[28, 28]}
										textStyle={styles.tableText}
									/>
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
							<Text style={styles.heading}>VERSION</Text>
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

							<RadioButton.Group
								onValueChange={(newValue) => setChecked(newValue)}
								value={checked}
							>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
									onPress={() => setChecked('English')}
								>
									<Text style={{fontSize: 16}}>English</Text>
									<RadioButton.Android value="English" />
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
									onPress={() => setChecked('Vietnamese')}
								>
									<Text style={{fontSize: 16}}>Tiếng Việt</Text>
									<RadioButton.Android value="Vietnamese" />
								</TouchableOpacity>
							</RadioButton.Group>
						</>
					)}
					<Pressable
						style={styles.button}
						onPress={() => {
							setModalVisible(!modalVisible);
							setState({ about: false, version: false, language: false });
						}}
					>
						<Text style={styles.textButton}>Close</Text>
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
	heading: { fontWeight: 'bold', fontSize: 20, paddingVertical: 10 },
	heading2: { fontWeight: 'bold', fontSize: 18, paddingVertical: 5 },
	divider: { backgroundColor: '#000', height: 2, width: '100%' },
	head: { height: 40, backgroundColor: '#f1f8ff' },
	row: {
		height: 28,
		backgroundColor: 'white',
	},
	tableText: {
		textAlign: 'center',
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
		fontWeight: 'bold',
		fontSize: 18,
	},
	text: {
		fontSize: 18,
	},
});
