import { StatusBar as SB } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Platform,
  StatusBar
 } from 'react-native';
import  LandingScreen  from './src/screens/LandingScreen/LandingScreen';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font'
import  AppLoading from 'expo-app-loading'



const getFonts = () => {
  return Font.loadAsync({
    'ArbeiBerry': require('./src/assets/fonts/ArbeiBerry.ttf')
  })
} 


export default function App() {

  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <View style={styles.container}>
        <LandingScreen />
        <SB style="auto" />
      </View>
    )
  } else {
    return <AppLoading 
    startAsync={getFonts}
    onError={() => console.log("error")}
    onFinish={() => setLoaded(true)}
  />
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "100%",
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
});