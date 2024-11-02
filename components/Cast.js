import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { fallbackPersonImage, image185 } from '../api/moviedb';

const Cast = ({ cast, navigation }) => {
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mg-5">Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} >
                {cast && cast.map((person, index) => {

                    return <TouchableOpacity key={index} className="mr-4 items-center" onPress={() => navigation.navigate("Person", person)}>
                        <View className="overflow-hideen rounded-full h-20 w-20 items-center border border-neutral-500">
                            <Image className="rounded-full h-24 w-20"
                                // source={require("../assets/images/john.jpg")
                                source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                            />
                        </View>
                        <Text className=" text-white text-xs mt-4">{person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character}</Text>
                        <Text className=" text-neutral-400 text-xs mt-1">{person.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person.original_name}</Text>

                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}
export default Cast