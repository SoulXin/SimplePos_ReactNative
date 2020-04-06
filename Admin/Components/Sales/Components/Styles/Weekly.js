import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10,
        flexDirection : 'column'
    },
    button_container : {
        flex : 1,
        width : '100%'
    },
    button_ok : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 5
    },
    row_child : {
        flexDirection : 'row',
        padding : 10,
        borderRadius : 7,
        borderWidth : 1,
        margin : 5
    },
    text : {
        flex : 1,
        textAlign : 'center'
    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 20
    },
    button_detail : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        marginTop : 8
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
    top_header_invoice : {
        borderBottomWidth : 1,
        padding : 5,
        margin : 5
    },
})

export default styles