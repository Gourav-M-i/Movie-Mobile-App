import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress'
import { theme } from '../theme';
const { height, width } = Dimensions.get('window')
const Loading = () => {
    return (
        <View style={{ height, width }} className="absolute flex-row justify-center items-center">
            <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
        </View>
    );
}


export default Loading;