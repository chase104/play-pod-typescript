import React, { useRef } from 'react'
import { View, Text, Dimensions, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import styles from '../LandingScreen/styles.js'

let screenWidth = Dimensions.get('window').width;



const Slides = () => {

    const studentSlideTwo = (accountType) => {
        return <Text>Student Slide 2 returned</Text>
    }
    let teacherSlides = [
        <Text>TeacherSlide 1</Text>, <Text>TeacherSlide 1</Text>, <Text>TeacherSlide 3</Text>, <Text>TeacherSlide 4</Text>
    ]
    let studentSlides = [
        <View>
            <Text style={styles.simpleTitle}>Let's create your account!</Text>
            <View>
                <Text style={styles.inputLabel}>School Code</Text>
                <TextInput 
                    style={styles.simpleInput}
                    placeholder="Ask your teacher for your school code"
                />
            </View>
        </View>,
        studentSlideTwo(),
        <Text>StudentSlide 3</Text>, 
        <Text>StudentSlide 4</Text>
    ]
    return (
        <Animated.View style={[styles.signUpSlidesContainer, {left: -screenWidth}, {transform: [{translateX: translateXValueSlides}]}]}>
            <View style={[styles.slide, {width: screenWidth}, ]}>
                <Text style={styles.simpleTitle}>You're...</Text>
            </View>
            {accountType == "teacher" ? 
                teacherSlides.map((slideJSX) => {
                    return (
                        <View style={[styles.slide, {width: screenWidth}, ]} key={Math.random()}>
                            <Text>Teacher Slide</Text>
                        </View>
                    )        
                })
                :
                studentSlides.map((slideJSX) => {
                    return (
                        <View style={[styles.slide, {width: screenWidth}, ]} key={Math.random()}>
                            {slideJSX}
                        </View>
                    )                                     
                })
                }

        </Animated.View>
    )
}

export default Slides
