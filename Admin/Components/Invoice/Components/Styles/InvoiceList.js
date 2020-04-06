import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container_modal_delete : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container_box_modal_delete : {
        padding : 50,
        backgroundColor : '#e3fdfd',
        borderRadius : 10
    },
    title_modal : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10,
        textAlign : 'center'
    },
    row_modal_delete : {
        flexDirection : 'row',
        marginTop : 20
    },
    button_close_modal_delete : {
        backgroundColor : '#ffb6b9',
        padding : 10,
        borderRadius : 5,
        alignItems : 'center',
        margin : 2
    },
    button_delete_modal_delete : {
        backgroundColor : '#61c0bf',
        padding : 10,
        borderRadius : 5,
        alignItems : 'center',
        margin : 2
    },
    button_new_invoice : {
        padding : 10,
        borderRadius : 7,
        margin : 10,
        backgroundColor : '#61c0bf'
    },
    text_new_invoice : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    row_invoice : {
        flexDirection : 'row'
    },
    button_delete_invoice : {
        backgroundColor : '#ffb6b9',
        borderRadius : 5,
        marginTop : 8,
        marginRight : 5
    },
    button_detail_invoice : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        marginTop : 8,
        marginLeft : 5
    }
})

export default styles