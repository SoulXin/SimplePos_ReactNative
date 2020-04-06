import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    container_modal : {
        flexDirection : 'column',
        flex : 1,
        margin : 10
    },
    first_cell : {
        flex : 1,
        padding : 5,
        borderRadius : 5
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    modal_title_text : {
        fontSize : 18,
        margin : 5,
        flex : 1
    },
    container_picker : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    second_cell : {
        flex : 1,
        borderWidth : 1,
        padding : 5,
        borderRadius : 5,
        borderColor : '#61c0bf'
    },
    button_modal_back : {
        backgroundColor : '#e3fdfd',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    button_modal_ok : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    button_text : {
        textAlign : 'center',
        fontSize : 14
    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 16
    },
    text_input : {
        borderBottomWidth : 1,
        fontSize : 16
    },
    row_price_capital : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        marginTop : 20
    },
    cell_price_capital : {
        flex : 1,
        marginRight : 5
    },
    button_picker_motorcycle : {
        backgroundColor : '#61c0bf',
        borderRadius : 10,
        padding : 10,
        marginTop : 20
    },
    button_picker_text_motorcycle : {
        textAlign : 'center',
        fontSize  : 14,
        color : 'white'
    },
    container_button : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        bottom : 0
    },
    button_delete : {
        backgroundColor : '#ffb6b9',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    button_save : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        flex : 1,
        borderRadius : 10
    },
    container_type : {
        padding : 5,
        margin : 5,
        backgroundColor : '#bbded6',
        borderRadius : 5,
        flex : 5
    },
    button_add_type : {
        padding : 5,
        margin : 5,
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        flex : 1
    },
    button_delete_selection : {
        padding : 5,
        margin : 5,
        backgroundColor : '#ffb6b9',
        borderRadius : 5,
        flex : 1
    }
})

export default styles