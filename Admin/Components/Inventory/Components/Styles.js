import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container_modal : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container_box_modal : {
        padding : 50,
        borderRadius : 10,
        backgroundColor : '#e3fdfd'
    },
    title : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10
    },
    row : {
        flexDirection : 'row'
    },
    container_button: {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    button_decrement : {
        paddingRight : 22,
        paddingLeft : 22,
        paddingTop : 9,
        paddingBottom : 9,
        borderRadius : 5,
        backgroundColor : '#ffb6b9'
    },
    button_text : {
        fontSize : 24,
        fontWeight : 'bold'
    },
    text_qty : {
        padding : 10,
        textAlign : 'center'
    },
    button_increment : {
        paddingRight : 20,
        paddingLeft : 20,
        paddingTop : 9,
        paddingBottom : 9,
        borderRadius : 5,
        backgroundColor : '#61c0bf'
    },
    row_bottom : {
        marginTop : 20,
        flexDirection : 'row'
    },
    cell_row_bottom : {
        flex : 1,
        margin : 2 
    },
    button_cancel : {
        padding : 10,
        borderRadius : 7,
        backgroundColor : '#ffb6b9'
    },
    button_refresh : {
        padding : 10,
        borderRadius : 7,
        backgroundColor : '#61c0bf'
    },
    button_text : {
        fontSize : 14,
        textAlign : 'center'
    },
    button_update : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        marginTop : 8
    }
})

export default styles