import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    title_text : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    second_title_text : {
        fontWeight : 'bold',
        fontSize : 16
    },
    text_input_name : {
        borderBottomWidth : 1,
        fontSize : 16
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 20,
    },
    text_input_year : {
        borderBottomWidth : 2,
        fontSize : 16,
        textAlign : 'center'
    },
    button_add : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 10,
        width : '100%'
    },
    row_bottom : {
        position : 'absolute',
        bottom : 0,
        width : '100%',
        alignItems : 'center',
    }
})

export default styles