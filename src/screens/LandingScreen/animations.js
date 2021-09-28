import { useRef } from 'react'
import { Animated, Dimensions } from 'react-native'

let screenWidth = Dimensions.get('window').width;
let marginValue = (screenWidth - 200) / 2;


export const translateLogoXValue = new Animated.Value(marginValue).current;

