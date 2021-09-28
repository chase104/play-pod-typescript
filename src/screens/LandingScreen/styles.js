
import { StyleSheet } from 'react-native'



export default  styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    body: {
        flex: 9,
        alignItems: 'center',
    },
    headerContainer: {
        display: "flex",
        width: "100%",
        height: 116,
    },
    contentContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        flex: 4,

    },
    slidesContainer: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        flex: 4,
    },
    textAndInputContainer: {
        width: "80%",
        display: "flex",
        alignItems: "flex-start"
    },

    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        flex: 1,
    },
    initialTextContainer: {
        position: "absolute",
        top: 250,
        display: "flex",
    },
    basicTextContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    basicText: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 60
        
    },
    animatedContainer: {
        width: 200,
        height: 200,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        paddingTop: 200,
        alignItems: "center",
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgb(117, 203, 253)',
        width: "50%",
        fontFamily: 'ArbeiBerry'
    },
    buttonText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgb(117, 203, 253)',
        width: "100%",
        fontFamily: 'ArbeiBerry'
    }, 
    nope: {
        backgroundColor: "orange",
        height: '100%',
        width: '100%'
    },
    screenTitle: {
        textAlignVertical: "center",
        position: "absolute",
        fontSize: 20,
        width: '90%',
        height: 100,
        marginLeft: 112,
        top: 0,

        
    },
    title: {
        fontSize: 30,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        textAlign: "center",
    },
    signUpSlidesContainer:{
        display: "flex",
        position: "absolute",
        flexDirection: "row",
        height: "100%",
        width: "auto",
    },
    slide: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    simpleTitle:{
        marginBottom: 40,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputLabel:{
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 12,
        marginLeft: 4
    },
    simpleInput: {
        borderWidth: 1,
        fontWeight: 'bold',
        padding: 12,
        height: 40
    },
    formContainer: {
        display: "flex",
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        position: "absolute"
    },
    input: {
        borderWidth: 2, 
        borderColor: 'rgb(117, 203, 253)',
        width: '100%',
        padding: 12
    },
})
