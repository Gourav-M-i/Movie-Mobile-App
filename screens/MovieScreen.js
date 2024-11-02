import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from "react-native-heroicons/solid"
import { styles, theme } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

const { width, height } = Dimensions.get("window")
const ios = Platform.OS === "ios";
const topMargin = ios ? '' : 'mt-3'
const MovieScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isFavourite, toggleFavourite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movie, setMovie] = useState({})
    const getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if (data) {
            setMovie(data)
        }
        setLoading(false);
    }
    const getMovieCredits = async (id) => {
        const data = await fetchMovieCredits(id)
        if (data && data?.cast) setCast(data?.cast)
    }

    const getSimilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
    }
    useEffect(() => {
        setLoading(true);
        getMovieDetails(item?.item?.id || item.id)
        getMovieCredits(item?.item?.id || item.id)
        getSimilarMovies(item?.item?.id || item.id)
    }, [])
    return (
        <ScrollView
            contententContainerStyle={{ padding: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(prev => !prev)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? <Loading /> :
                        <View>
                            <Image
                                // source={require('../assets/images/poster1.jpg')}
                                source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.4 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className="absolute bottom-0"
                            />
                        </View>
                }

            </View>

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                    {movie?.status} * {movie?.release_date?.split('-')[0]} * {movie?.runtime} min
                </Text>
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = true;
                            if (index === movie?.genres.length - 1) showDot = false
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre.name} {showDot ? ' * ' : ''}
                                </Text>
                            )
                        })
                    }
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie?.overview}
                </Text>

                <Cast cast={cast} navigation={navigation} />


                <MovieList title="Similar Novies" data={similarMovies} hideSeeAll={true} />

            </View>

        </ScrollView>
    );
}


export default MovieScreen;
