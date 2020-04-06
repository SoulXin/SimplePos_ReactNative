import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10,
        flexDirection : 'column'
    },
    container_modal_detail :{
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center' 
    },
    container_box_modal_detail : {
        padding : 50,
        backgroundColor : '#e3fdfd',
        borderRadius : 10
    },
    title_text_modal : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10
    },
    row : {
        flexDirection : 'row'
    },
    container_button_decrement : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        opacity : 1
    },
    container_box_button_decrement : {
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
    qty_text : {
        padding : 10,
        textAlign : 'center'
    },
    container_button_increment : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container_box_button_increment : {
        paddingRight : 20,
        paddingLeft : 20,
        paddingTop : 9,
        paddingBottom : 9,
        borderRadius : 5,
        backgroundColor : '#61c0bf'
    },
    second_title_text_modal : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10,
        textAlign : 'center',
        marginTop : 10
    },
    text_input_pay_mechanic : {
        flex : 4,
        borderWidth : 1,
        borderRadius : 7,
        textAlign : 'center',
        fontSize : 20,
        fontWeight : 'bold',
        color : 'red',
        margin : 3
    },
    button_reset_pay_mechanic : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderRadius : 7,
        margin : 3 
    },
    date : {
        flex : 1,
        alignItems : 'flex-end'
    },
    title_table_header : {
        flexDirection : 'row',
        margin : 5,
        padding : 10
    },
    title_table_cell : {
        flex : 1,
        textAlign : 'center'
    },
    container_button_invoice : {
        flex : 1,
        width : '100%'
    },
    button_add_product : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 10,
        alignItems : 'center'
    },
    button_complete : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 10
    },
    row_child : {
        flexDirection : 'row',
        alignItems : 'center',
        margin : 5,
        padding : 10,
        borderRadius : 5,
        borderWidth : 1
    },
    button_delete_product : {
        backgroundColor : '#ffb6b9',
        padding : 10,
        borderRadius : 5,
        alignItems : 'center',
        margin : 2
    },
    button_refresh_product : {
        backgroundColor : '#61c0bf',
        padding : 10,
        borderRadius : 5,
        alignItems : 'center',
        margin : 2
    }
})

export default styles