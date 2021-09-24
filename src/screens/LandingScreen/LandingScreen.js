import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.png';



const LandingScreen = () => {

    const [appLocation, setAppLocation] = useState(1);
    const [formState, setFormSate] = useState({})

    let returnForm = () => {
        return (
            <View style={styles.formContainer}>
                <TextInput 
                placeholder="Email"
                onChangeText={(text) => { setFormState({...formState, email: text})}}
                style={styles.input}
                />
                <TextInput 
                placeholder="Password"
                onChangeText={(text) => { setFormState({...formState, password: text})}}
                style={styles.input}
                />
            </View>
        )
    }

    const returnText = (textArray) => {
        return (
            <View>
                {textArray.map((text) => {
                    return <Text key={Math.random()} style={{fontWeight: "inherit"}}>{text}</Text>
                })}
            </View>
        )
    }

    let mySlides = [
        returnForm(),
        /////////////////
        <View style={styles.initialTextContainer}>
            {returnText(["Hi There", "Do you have an account?"])}
        </View>,
        /////////////////
        returnText(["You're..."]),
        ////////////////
        <View>
            <Text>Hi There!</Text>
            <Text>Do you have an account?</Text>
        </View>,
    ]

    let screenWidth = Dimensions.get('window').width;

    let marginValue = (screenWidth - 200) / 2;

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
            handleBack("Back");
            return true
        });
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", () => {
                handleBack("Back");
                return true
            })
        }
    }, [appLocation])
    //Logo Animations
    const translateLogoXValue = useRef(new Animated.Value(marginValue)).current;
    const translateLogoYValue = useRef(new Animated.Value(116)).current;
    const scaleLogoXValue = useRef(new Animated.Value(1)).current;
    const scaleLogoYValue = useRef(new Animated.Value(1)).current;


    // Title X Animation
    const translateTitleXValue = useRef(new Animated.Value(screenWidth)).current;

    // Slides X Animation
    const slidesTranslateX = useRef(new Animated.Value(-screenWidth)).current;


    const returnTitleText = () => {
        if (appLocation == 1) return ""
        if (appLocation == "signIn") return "Login"
        return "Sign Up"
    }

    const returnHeaderAndLogo = () => {
        return (
            <View style={styles.headerContainer}>
                <Animated.View style={[styles.animatedContainer, {transform: [{translateX: translateLogoXValue}, {translateY: translateLogoYValue}, {scaleX: scaleLogoXValue}, {scaleY: scaleLogoYValue}]}]}>
                    <Image  source={Logo} style={styles.logo} />
                </Animated.View>
                <Animated.Text style={[styles.screenTitle, {transform: [{translateX: translateTitleXValue}]}]}>{returnTitleText()}</Animated.Text>
            </View>
        )
    }

    const returnButtons = () => {
        let leftText, rightText;
        switch (appLocation) {
            case "signIn": 
                leftText = "Back"
                rightText = "Submit";
                break;
            case 1:
                // This is initial page
            leftText = "Yep!"
            rightText = "Nope";
            break;
            case 2: {
                // First page of Sign Up
                leftText = "A Teacher"
                rightText = "A Student";
                break;
            }
            default: {
                leftText = "Back"
                rightText = "Next";
                break;
            }
        }
        return (
        <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(leftText)}>
                    <Text style={styles.buttonText}>{leftText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(rightText)} >
                    <Text style={[styles.buttonText, styles.nope]}>{rightText}</Text>
                </TouchableOpacity>
        </View>
        )
    }



    function animate(variable, value){
        Animated.timing(variable, {
            toValue: value,
            useNativeDriver: true,
        }).start()
    }

    const executeLogoAnimations = (isReverting) => {
        animate(translateLogoXValue, isReverting ? marginValue : -46)
        animate(translateLogoYValue, isReverting ? 116 : -44)
        animate(scaleLogoXValue, isReverting ? 1 : 0.5)
        animate(scaleLogoYValue, isReverting ? 1 : 0.5)
        animate(translateTitleXValue, isReverting ? screenWidth : 16)
    }
    const executeLoginAnimations = () => {
        executeLogoAnimations(false)
        animate(slidesTranslateX, 0)
    }
    const executeSignUpAnimations = (newLocation) => {
        executeLogoAnimations(false)
        animate(slidesTranslateX, -newLocation*screenWidth)
    }

    function handleBack() {
        if (appLocation === "signIn") {
            setAppLocation(1)
            animate(slidesTranslateX, -screenWidth);
            executeLogoAnimations(true)
        } else if (appLocation > 1) {
            let previousLocation = appLocation-1;
            newValue = -previousLocation*screenWidth;
            animate(slidesTranslateX, newValue);
            if (appLocation === 2) executeLogoAnimations(true);
            setAppLocation(previousLocation)
        }
    }
    function handlePress(text) {
        switch(text){
            case "Back": 
                handleBack();
                break;
            case "Yep!":
                setAppLocation("signIn")
                executeLoginAnimations(false)
                break;
            case "Nope":
                setAppLocation(2);
                executeSignUpAnimations(2);
                break;
            case "Submit": 
                console.log("submitted");
                break;
            default: 
                setAppLocation(appLocation+1);
                executeSignUpAnimations(appLocation+1);

        }
    }

    return (
        <View style={styles.container}>
            {returnHeaderAndLogo()}
            <Animated.View style={[styles.slidesContainer, {transform: [{translateX: slidesTranslateX}]}]}>
                {mySlides.map((slideJSX) => {
                    return (
                        <View style={[styles.slide, {width: screenWidth}, ]} key={Math.random()}>
                            {slideJSX}
                        </View>
                    )
                })}
            </Animated.View>
            {returnButtons()}
        </View>
    )
}

export default LandingScreen
