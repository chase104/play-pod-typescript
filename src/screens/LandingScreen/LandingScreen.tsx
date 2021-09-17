import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import Logo from '../../assets/logo.png';

import styles from './styles.js'

export const LandingScreen = () => {

    let screenWidth = Dimensions.get('window').width;

    let marginValue = (screenWidth - 200) / 2;

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handlePress("Back"))

    }, [])


    const translateLogoXValue = useRef(new Animated.Value(marginValue)).current;
    const translateLogoYValue = useRef(new Animated.Value(300)).current;
    const scaleLogoXValue = useRef(new Animated.Value(1)).current;
    const scaleLogoYValue = useRef(new Animated.Value(1)).current;
    const translateTitleXValue = useRef(new Animated.Value(screenWidth)).current;
    const textTranslateXValue = useRef(new Animated.Value(0)).current;
    const translateXValueYoure = useRef(new Animated.Value(screenWidth)).current;
    const formTranslateX = useRef(new Animated.Value(-screenWidth)).current;
    
    const [appPage, setAppPage] = useState("Initial")
    const [formState, setFormState] = useState({
        email: null,
        password: null
    })


    const executeInitialAnimations = () => {
        Animated.timing(translateLogoXValue, {
            toValue: -46,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateLogoYValue, {
            toValue: 146,
            useNativeDriver: true,
        }).start()

        Animated.timing(scaleLogoXValue, {
            toValue: 0.5,
            useNativeDriver: true,
        }).start()

        Animated.timing(scaleLogoYValue, {
            toValue: 0.5,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateTitleXValue, {
            toValue: 16,
            useNativeDriver: true,
        }).start()



    }

    const executeYepAnimations = () => {
        Animated.timing(textTranslateXValue, {
            toValue: screenWidth,
            useNativeDriver: true,
        }).start()
        Animated.timing(formTranslateX, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }

    const executeNopeAnimations = () => {
        // Initial Text goes LEFT
        Animated.timing(textTranslateXValue, {
            toValue: -screenWidth,
            useNativeDriver: true,
        }).start()
        
        // 'You're' comes in FROM RIGHT
        Animated.timing(translateXValueYoure, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }

    const reverseFormAnimation = () => {
        console.log("reversing")
        Animated.timing(formTranslateX, {
            toValue: -500,
            useNativeDriver: true,
        }).start()
    }

    const revertInitialAnimation = () => {
        Animated.timing(translateLogoXValue, {
            toValue: marginValue,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateLogoYValue, {
            toValue: 300,
            useNativeDriver: true,
        }).start()

        Animated.timing(scaleLogoXValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

        Animated.timing(scaleLogoYValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateTitleXValue, {
            toValue: screenWidth,
            useNativeDriver: true,
        }).start()

        Animated.timing(textTranslateXValue, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }

    const handleBack = (input) => {
        console.log("handleing Back", appPage)
        switch (appPage) {
            case "Yep!":
                reverseFormAnimation();
                revertInitialAnimation();
                setAppPage("Initial")
                break;
        }
    }

    function handlePress (input) {
        console.log("Pressed: ", input);
        switch(input) {
            case "Nope":
                setAppPage("Nope")
                executeInitialAnimations()
                executeNopeAnimations()
                break;
            case "Yep!":
                executeInitialAnimations()
                executeYepAnimations()
                setAppPage("Yep!")
                break;
            case "Back":
                handleBack(input)
                break;
        }   

    }



    const returnButtons = () => {
        let leftText, rightText;

        switch (appPage) {
            case "Initial": 
            leftText = "Yep!"
            rightText = "Nope";
            break;
            case "Yep!": 
                leftText = "Back"
                rightText = "Submit";
                break;
            case "Nope": {
                leftText = "Teacher"
                rightText = "Student";
                break;
            }
        }

        return (
        <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(leftText)}>
                    <Text style={styles.button}>{leftText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(rightText)} >
                    <Text style={[styles.button, styles.nope]}>{rightText}</Text>
                </TouchableOpacity>
        </View>
        )

    }

    const returnTitleText = () => {
        let text;
        switch (appPage) {
            case "Initial": 
                text=""
            break;
            case "Yep!": 
                text = "Login"
                break;
            case "Nope": {
                text = "Sign-Up"
                break;
            }
        }
        return text;
    }

    const returnForm = () => {
        return (
            <Animated.View style={[styles.formContainer, {transform: [{translateX: formTranslateX}]}]}>
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
            </Animated.View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <Animated.View style={[styles.animatedContainer, {transform: [{translateX: translateLogoXValue}, {translateY: translateLogoYValue}, {scaleX: scaleLogoXValue}, {scaleY: scaleLogoYValue}]}]}>
                        <Image  source={Logo} style={styles.logo} />
                    </Animated.View>
                    <Animated.Text style={[styles.screenTitle, {transform: [{translateX: translateTitleXValue}]}]}>{returnTitleText()}</Animated.Text>
                </View>
                <View style={styles.titleContainer}>
                    <Animated.Text style={[styles.title, {transform: [{translateX: textTranslateXValue}]}]}>
                        Hi there!
                    </Animated.Text>
                    <Animated.Text style={[styles.subtitle, {transform: [{translateX: textTranslateXValue}]}]}>
                        Do you have an account?
                    </Animated.Text>
                    <Animated.Text style={[styles.subtitle, styles.youre, {transform: [{translateX: translateXValueYoure}]}]}>
                        Youre...
                    </Animated.Text>
                    {returnForm()}

                </View>

            </View>
            {returnButtons()}
        </View>
    )
}


