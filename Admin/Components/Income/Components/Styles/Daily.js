import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    container_modal :{
        flex : 1,
        margin : 10,
        flexDirection : 'column'
    },
    table_header : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop : 5,
        marginBottom : 5,
        padding : 10,
        borderRadius : 7,
        backgroundColor : '#e3fdfd'
    },
    table_cell_1: {
        flex : 1,
        textAlign : 'center'
    },
    table_cell_2 : {
        flex : 2,
        textAlign : 'center'
    },
    container_button : {
        flex : 1,
        width : '100%'
    },
    button_ok : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 5
    },
    button_detail : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 20
    },
    row_child : {
        flexDirection : 'row',
        alignItems : 'center',
        padding : 10,
        borderRadius : 7,
        borderWidth : 1,
        marginBottom : 10
    },
    top_header_invoice : {
        borderBottomWidth : 1,
        padding : 5,
        margin : 5
    },
})

export default styles