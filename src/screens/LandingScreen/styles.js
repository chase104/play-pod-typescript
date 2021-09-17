
import { StyleSheet } from 'react-native'



export default  styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 9,
        alignItems: 'center',
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        flex: 2,
    },
    headerContainer: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        height: 100,
        paddingBottom: 300,
    },
    animatedContainer: {
        width: 200,
        height: 200,
    },
    imageTouch: {
        width: '100%',
        height: '100%'
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        marginTop: 20
    },
    subtitle: {
        fontSize: 20,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        textAlign: "center",
    },
    youre: {
        position: "absolute"
    },
    formContainer: {
        display: "flex",
        width: "100%",
        justifyContent: 'center',
        position: "absolute"
    },
    input: {
        borderWidth: 2, 
        borderColor: 'rgb(117, 203, 253)',
        margin: 20,
        width: '80%',
        fontSize: 20,
        padding: 12
    },
})
