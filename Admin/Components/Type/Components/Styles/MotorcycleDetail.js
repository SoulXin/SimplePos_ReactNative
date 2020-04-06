import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    second_title : {
        fontWeight : 'bold',
        fontSize : 16
    },
    text_input : {
        borderBottomWidth : 2,
        fontSize : 16
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20
    },
    container_button : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        bottom : 0
    },
    button_delete : {
        backgroundColor : '#ffb0cd',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    button_update : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    button_text : {
        textAlign : 'center',
        fontSize : 14
    }
})

export default styles