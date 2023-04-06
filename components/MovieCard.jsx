import {Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import colors from '../ultis/Colors';
import MarqueeText from 'react-native-marquee';
import { getDetail } from '../ultis/data';

 

export default function MovieCard({data, navigation}) {

	const toDetail = () => {
		if(!navigation) return
		if (!data) return
		//! uncomment to use API
		//getDetail(data.id).then(data => {
			navigation.navigate('detail', {
				movieData: data,
				headerTitle: data.title || data.name
			})
		//})
	}
	

	
  return (
    <Pressable style={styles.card} onPress={() => toDetail()}>
				<Image
					style={styles.image}
					source={{
						uri: data? data.image : null
					}}
				/>
				<MarqueeText
					style={styles.movieName}
					speed={0.2}
					marqueeOnStart={true}
					loop={true}
					delay={500}
          consecutive={true}
				>
					{data.title || data.name}
				</MarqueeText>
				<Text style={styles.movieYear}>{data ? data.year : Date.now}</Text>
				<Text>Hola</Text>
			</Pressable>
  )
}

const styles = StyleSheet.create({
	card: {
		width: '30%',
		height: 165,
		backgroundColor: colors.primaryColor,
		borderRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '80%',
	},
	movieName: {
		fontSize: 12,
		fontWeight: 'bold',
		paddingLeft: 5,
		paddingRight: 5,
	},
	movieYear: {
		fontSize: 11,
		paddingLeft: 5,
		paddingRight: 5,
	},
});