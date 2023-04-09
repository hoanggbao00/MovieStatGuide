import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import colors from '../ultis/Colors';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getFakeComming } from '../ultis/fakedata';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default function Banner({ navigation }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		getFakeComming().then((res) => {
			let temp = [];
			for (let i = 0; i <= 6; ++i) {
				temp.push(res.items[i]);
			}
			setData(temp);
		});
	}, []);

	return (
		<View style={styles.bannerView}>
			<Carousel
				// ref={(c) => (this.carousel = c)}
				data={data}
				renderItem={({ item }, parallaxProps) => (
					<TouchableOpacity
						style={styles.container}
						onPress={() => {
							navigation.navigate('detail', {
								headerTitle: item.title || item.name,
								movieData: item,
							});
						}}
					>
						<ParallaxImage
							source={{ uri: item.image }}
							containerStyle={styles.imageContainer}
							style={styles.image}
							parallaxFactor={0.4}
							{...parallaxProps}
						/>
						<Text style={styles.title}>{item.title || item.name}</Text>
					</TouchableOpacity>
				)}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				inactiveSlideShift={0}
				useScrollView={true}
				loop={true}
				hasParallaxImages={true}
				autoplay={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	bannerView: {
		height: '30%',
		width: '100%',
		overflow: 'hidden',
		padding: 5,
	},
	container: {
		position: 'relative',
		flex: 1,
	},
	imageContainer: {
		flex: 1,
		marginBottom: 1,
		backgroundColor: 'white',
		borderRadius: 8,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover',
	},
	title: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		backgroundColor: colors.secondaryColor,
		fontSize: 20,
	},
});
