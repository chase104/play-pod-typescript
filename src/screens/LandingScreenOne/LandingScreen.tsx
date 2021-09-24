import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import Logo from '../../assets/logo.png';
import Slides from './Slides.js'

import styles from '../LandingScreen/styles.js'

export const LandingScreen = () => {

    let screenWidth = Dimensions.get('window').width;

    let marginValue = (screenWidth - 200) / 2;



    const translateLogoXValue = useRef(new Animated.Value(marginValue)).current;
    const translateLogoYValue = useRef(new Animated.Value(116)).current;
    const scaleLogoXValue = useRef(new Animated.Value(1)).current;
    const scaleLogoYValue = useRef(new Animated.Value(1)).current;
    const translateTitleXValue = useRef(new Animated.Value(screenWidth)).current;
    const textTranslateXValue = useRef(new Animated.Value(0)).current;
    const translateXValueSlides = useRef(new Animated.Value(2*screenWidth)).current;
    const formTranslateX = useRef(new Animated.Value(-screenWidth)).current;
    
    const [appPage, setAppPage] = useState("Initial");
    const [signUpPages, setSignUpPages] = useState([1, 2, 3]);

    const [signUpLocation, setSignUpLocation] = useState(0);
    const [isTeacher, setIsTeacher] = useState(false);


    const [formState, setFormState] = useState({
        email: null,
        password: null
    })

    const [newAccount, setNewAccount] = useState({
        accountType: null,
    })


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
    }, [appPage, signUpLocation])

    const executeInitialAnimations = () => {
        Animated.timing(translateLogoXValue, {
            toValue: -46,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateLogoYValue, {
            toValue: -44,
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

    const revertInitialAnimation = () => {
        Animated.timing(translateLogoXValue, {
            toValue: marginValue,
            useNativeDriver: true,
        }).start()

        Animated.timing(translateLogoYValue, {
            toValue: 116,
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

        
        // 'You're' comes in FROM RIGHT
        Animated.timing(translateXValueSlides, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }


    const reverseFormAnimation = () => {
        Animated.timing(formTranslateX, {
            toValue: -500,
            useNativeDriver: true,
        }).start()
    }

    function executeSignUpAnimations (toLocation) {
        let xValue;
        switch (toLocation){
            case 0: 
                xValue = screenWidth*2;
                break;
            case 1: 
                xValue = screenWidth;
                break;
            case 2: 
                xValue = 0;
                break;
            case 3: 
                xValue = -screenWidth;
                break;
            case 4: 
                xValue = -screenWidth*2;
                break;
            case 5: 
                xValue = -screenWidth*3;
                break;
            case 6: 
                xValue = -screenWidth*4;
                break;
        }
        if (toLocation == 1) {
            Animated.timing(textTranslateXValue, {
                toValue: -screenWidth,
                useNativeDriver: true,
            }).start()
        }
        Animated.timing(translateXValueSlides, {
            toValue: xValue,
            useNativeDriver: true,
        }).start()
    }


    const processSignUpInputAndAnimate = (input) => {
        switch (input) {
            case "Nope":
                setAppPage("SignUp-1")
                executeInitialAnimations()
                setSignUpLocation(1)
                executeSignUpAnimations(1)
                break;
            case "A Teacher":
                // STILL NEED set state as teacher
                setAppPage("SignUp-2")
                setNewAccount({...newAccount, accountType: "teacher"})
                setSignUpLocation(2)
                executeSignUpAnimations(2)
                break;
            case "A Student":
                // STILL NEED set state as student
                setAppPage("SignUp-2")
                setNewAccount({...newAccount, accountType: "student"})
                setSignUpLocation(2)
                executeSignUpAnimations(2)
                break;
            case "Next":
                // STILL NEED set state as student
                let nextPageNumber = signUpLocation+1
                console.log(nextPageNumber)
                setAppPage(`SignUp-${nextPageNumber}`)
                setSignUpLocation(nextPageNumber)
                executeSignUpAnimations(nextPageNumber)
                break;
        }

    }


    const handleBack = (input) => {
        console.log("BACK, PAGE: ", appPage)
        console.log("signup Location: ", signUpLocation)
        switch (appPage) {
            case "Yep!":
                reverseFormAnimation();
                revertInitialAnimation();
                setAppPage("Initial")
                break;
            default:
                console.log("handling default back")
                if (signUpLocation <= 1){
                    revertInitialAnimation();
                    Animated.timing(translateXValueSlides, {
                        toValue: 2*screenWidth,
                        useNativeDriver: true,
                    }).start()
                    setAppPage("Initial")
                    setSignUpLocation(0)
                } else {
                    let previousPageNumber = signUpLocation-1
                    console.log("SETTING LOCATION TO ", previousPageNumber)
                    setAppPage(`SignUp-${previousPageNumber}`)
                    setSignUpLocation(previousPageNumber)
                    executeSignUpAnimations(previousPageNumber)
                    break;
                }
        }
    }

    const handleSubmit = () => {
        console.log("submitted")
    }
    function handlePress (input) {
        switch(input) {
            case "Yep!":
                executeInitialAnimations()
                executeYepAnimations()
                setAppPage("Yep!")
                break;
            case "Back":
                handleBack(input)
                break;
            case "Submit":
                handleSubmit()
                break;
            default:
                processSignUpInputAndAnimate(input);
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
            case "SignUp-1": {
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
    const returnInitialSlide = () => {
        return (
            <Animated.View style={[styles.slide, styles.titleContainer, {transform: [{translateX: textTranslateXValue}]}]}>
                <Animated.Text style={styles.title}>
                    Hi there!
                </Animated.Text>
                <Animated.Text style={styles.subtitle}>
                    Do you have an account?
                </Animated.Text>
            </Animated.View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {returnHeaderAndLogo()}
                <View style={styles.contentContainer}>
                    {returnInitialSlide()}
                    <Slides accountType={newAccount.accountType} />
                    {returnForm()}

                </View>
            </View>
            {returnButtons()}
        </View>
    )
}


