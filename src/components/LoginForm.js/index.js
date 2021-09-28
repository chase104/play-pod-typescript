import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Animated, TouchableOpacity, TextInput, BackHandler } from 'react-native';

const LoginForm = ({formState, setFormState}) => {
    let screenWidth = Dimensions.get('window').width;

    return (
        <View style={[styles.slide, {width: screenWidth}, ]} key={Math.random()}>
            <View style={styles.formContainer} key="form-container">
                    <TextInput 
                    placeholder="Email"
                    onChangeText={(text) => setFormState({...formState, email: text})}
                    key="email-input"
                    value={formState.email}
                    style={styles.input}
                    
                    />
                    <TextInput 
                    placeholder="Password"
                    onChangeText={(text) => { setFormState({...formState, password: text})}}
                    key="password-input"
                    value={formState.password}
                    style={styles.input}
                    />
            </View>
    </View>
    )
}

export default LoginForm
