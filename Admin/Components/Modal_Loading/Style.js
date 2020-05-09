import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container_loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    loading : {
        padding : 50,
        borderRadius : 10,
        backgroundColor : 'white',
        borderWidth : 3,
        borderColor : '#61c0bf'
    },
    loading_text : {
        color : '#61c0bf',
        fontWeight : 'bold',
        fontSize : 24,
        textAlign : 'center',
    }
})

export default styles