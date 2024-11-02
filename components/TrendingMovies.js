import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Carousel from "react-native-snap-carousel"
import { fallbackMoviePoster, image500 } from '../api/moviedb';

const { width, height } = Dimensions.get("window")
const TrendingMovies = ({ data }) => {
    const navigation = useNavigation()
    const handleClick = (item) => {
        navigation.navigate("Movie", item)
    }
    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
                data={data}
                renderItem={(item) => <MovieCard item={item} handleClick={() => handleClick(item)} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItem: 'center' }}
            />
        </View>
    );
}


export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableOpacity onPress={() => handleClick(item)}>
            <Image
                // source={require("../assets/images/poster1.jpg")}
                source={{ uri: image500(item.item.poster_path) || fallbackMoviePoster }}
                style={{ width: width * 0.6, height: height * 0.4 }} className="rounded-3xl" />
        </TouchableOpacity>
    )
}
