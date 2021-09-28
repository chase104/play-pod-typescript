import React, {  useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.png';


const LandingScreen = () => {

    const [appLocation, setAppLocation] = useState(1);
    const [signInState, setSignInState] = useState({email: '', password: ''})
    const [newUser, setNewUser] = useState({
        type: null,
        schoolCode: "",
        email: null,
        password: "",
        passwordCheck: "",


        // STUDENT
        studentNumber: null,
        alias: null,

        // TEACHER
    })
    let screenWidth = Dimensions.get('window').width;
    let marginValue = (screenWidth - 200) / 2;

    const handleNewAccountChange = (property, value) => {
        setNewUser({
            ...newUser,
            [property]: value
        })
    }

    // useEffect(() => {
    //     console.log(newUser)
    //     console.log(signInState)
    // }, [newUser, signInState])

    const changeText = (property, placeHolder, isSignIn, text) => {
        if (isSignIn) {
            setSignInState({...signInState, [property]: text})
        } else {
            setNewUser({...newUser, [property]: text})
        }
    }

    const returnText = (textArray, inputArray) => {
        return (
            <View style={styles.basicTextContainer}>
                {textArray.map((text) => {
                    return <Text key={text+251235} style={styles.basicText}>{text}</Text>
                })}
                { inputArray != undefined ? 
                        inputArray.map(({property, placeHolder, title, isSignIn}) => {
                            return <View style={styles.textAndInputContainer} key={placeHolder}>
                                <Text style={styles.inputLabel}>{title}</Text>
                                <TextInput 
                                placeholder={placeHolder}
                                onChangeText={(text) => changeText(property, placeHolder, isSignIn, text)}
                                defaultValue={property === "email" ? signInState.email : signInState.password}
                                style={styles.input}
                                />
                            </View>

                        })
                    : null}
            </View>

        )
    }

    let slides = [
        returnText([], [
            {property: "email", placeHolder: "Email", isSignIn: true}, 
            {property: "password", placeHolder: "Password", isSignIn: true}]
            ),
        /////////////////
        <View style={styles.initialTextContainer}>
            {returnText(["Hi There!", "Do you have an account?"])}
        </View>,
        /////////////////
        returnText(["You're a..."]),
        ////////////////
        returnText(["Let's create your account!"], [{property: "schoolCode", title: "School Code", placeHolder: "Ask your teacher for your school code"}]),
        returnText(["What should we call you?"], [{property: "alias", title: "Alias", placeHolder: ""}]),
        returnText(["Just 2 more steps!"], [{property: "email", title: "Email", placeHolder: ""}]),
        returnText(["Almost Done!"], [{property: "password", title: "Password", placeHolder: ""}]),
        returnText(["Last Step!"], [{property: "passwordCheck", title: "Confirm Password", placeHolder: ""}]),


    ]


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
    const translateLogoYValue = useRef(new Animated.Value(116)).current;
    const translateLogoXValue = useRef(new Animated.Value(marginValue)).current;
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
        let leftText, rightText, propertyName
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
                leftText = "Teacher";
                rightText = "Student";
                propertyName = "type"
                break;
            }
            case "Last": {
                leftText = "Back";
                rightText = "Submit";
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
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(leftText, propertyName)}>
                    <Text style={styles.buttonText}>{leftText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handlePress(rightText, propertyName)} >
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
        } else {
            let previousLocation = slides.length-2;
            newValue = -previousLocation*screenWidth;
            animate(slidesTranslateX, newValue);
            setAppLocation(previousLocation)
        }
    }
    const goNext = () => {
        console.log("app location pre move: ", appLocation, slides.length)
        if (appLocation == slides.length-2){
            setAppLocation("Last")
        } else {
            setAppLocation(appLocation+1);
        }
        executeSignUpAnimations(appLocation+1);


    }
    const processDynamicAnswer = (text, propertyName) => {
        setNewUser({...newUser, [propertyName]: text.toLowerCase()})
        goNext()
    }

    function handlePress(text, propertyName) {
        console.log(text, propertyName)
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
            case "Next": 
                goNext()
                break;
            
            default: processDynamicAnswer(text, propertyName)

        }
    }
    return (
        <View style={styles.container}>
            {returnHeaderAndLogo()}
            <Animated.View style={[styles.slidesContainer, {width: screenWidth*slides.length}, {transform: [{translateX: slidesTranslateX}]}]}>
                {slides.map((slideJSX, index) => {
                    return (
                        <View style={[styles.slide, {width: screenWidth}]} key={index} >
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