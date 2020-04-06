import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10  
    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 16
    },
    text_input : {
        borderBottomWidth : 1,
        fontSize : 16
    },
    container_buttom : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        bottom : 0
    },
    button_add : {
        backgroundColor : '#61c0bf',
        padding : 10,
        borderRadius : 7
    }
})

export default styles