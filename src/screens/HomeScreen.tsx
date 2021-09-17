import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

export const HomeScreen = () => {
    return (
        <View>
            <Text>Landing Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigation: {
        flex: 2
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

