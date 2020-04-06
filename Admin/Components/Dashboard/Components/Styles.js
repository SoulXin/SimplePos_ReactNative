import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container_add_new_product : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    container_box_add_new_product : {
        padding : 50,
        borderRadius : 10,
        backgroundColor : '#e3fdfd'
    },
    main_title_modal : {
        fontWeight : 'bold',
        fontSize : 20,
        marginBottom : 10
    },
    row : {
        flexDirection : 'row'
    },
    cell : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    decrement_qty_button : {
        paddingRight : 22,
        paddingLeft : 22,
        paddingTop : 9,
        paddingBottom : 9,
        borderRadius : 5,
        backgroundColor : '#ffb6b9'
    },
    increment_qty_button : {
        paddingRight : 20,
        paddingLeft : 20,
        paddingTop : 9,
        paddingBottom : 9,
        borderRadius : 5,
        backgroundColor : '#61c0bf'
    },
    button_text : {
        fontSize : 24,
        fontWeight : 'bold'
    },
    qty_text : {
        padding : 10,
        textAlign : 'center'
    },
    input_pay_mechanic : {
        flex : 4,
        borderWidth : 1,
        borderRadius : 7,
        textAlign : 'center',
        fontSize : 20,
        fontWeight : 'bold',
        color : 'red'
    },
    button_reset_pay_mechanic : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderRadius : 7,
        margin : 3 
    },
    button_text_reset : {
        fontSize : 20
    },
    header_searchbar : {
        backgroundColor : '#61c0bf'
    },
    header_searchbar_column : {
        borderRadius : 5,
        marginRight : 5
    },
    button_add_invoice : {
        position : 'absolute',
        bottom : 20,
        left : 20,
        backgroundColor : '#61c0bf'
    },
    button_back : {
        position : 'absolute',
        bottom : 20,
        left : 20,
        backgroundColor : '#ffb6b9'
    }
})

export default styles