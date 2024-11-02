import React, { useEffect, useState } from 'react'
import { Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from '../theme'
import { ScrollView } from 'react-native-gesture-handler'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchtopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'
const ios = Platform.OS == 'ios'
const HomeScreen = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(false)

    const getTrendingMovies = async () => {
        // setLoading(true)
        const data = await fetchTrendingMovies()
        if (data && data.results) {
            setTrending(data.results)
        }
        // setLoading(false);
    }
    const getUpcomingMovies = async () => {
        // setLoading(true)
        const data = await fetchUpcomingMovies()
        if (data && data.results) {
            setUpcoming(data.results)
        }
        // setLoading(false);
    }
    const getTopRatedMovies = async () => {
        // setLoading(true)
        const data = await fetchtopRatedMovies()
        if (data && data.results) {
            setTopRated(data.results)
        }
        // setLoading(false);
    }
    useEffect(() => {
        setLoading(true)
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        setLoading(false)
    }, [])

    const navigation = useNavigation()
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? <Loading /> : <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    {trending.length > 0 && <TrendingMovies data={trending} />}
                    {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
                    {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
                </ScrollView>
            }

        </View>
    )
}

export default HomeScreen