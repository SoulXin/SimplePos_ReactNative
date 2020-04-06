import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container_modal : {
        flex : 1,
        margin : 5,
        borderWidth : 1,
        borderRadius : 7,
    },
    container_modal_edit : {
        flex : 1,
        margin : 5,
        borderWidth : 1,
        borderRadius : 7,
        flexDirection : 'column'
    },
    row : {
        flexDirection : 'row'
    },
    left : {
        flex : 2,
        marginLeft : 10
    },
    center : {
        flex : 1,
        textAlign : 'left'
    },
    right : {
        flex : 3,
        textAlign : 'left'
    },
    container_button_close : {
        width : '100%', 
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        bottom : 0
    },
    container_box_button_close : {
        backgroundColor : '#ffb6b9',
        padding : 10,
        borderRadius : 7,
        margin : 10
    },
    container_scrollview : {
        marginLeft : 10,
        marginRight : 10
    },
    title_text : {
        fontWeight : 'bold',
        fontSize : 16
    },
    text_input : {
        borderBottomWidth : 1,
        fontSize : 16
    },
    row_bottom : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        // position : 'absolute',
        // bottom : 0
        flex : 1
    },
    button_delete : {
        flex : 1,
        backgroundColor : '#ffb6b9',
        padding : 10,
        borderRadius : 7,
        margin : 10
    },
    button_cancel : {
        flex : 1,
        backgroundColor : '#ffb6b9',
        padding : 10,
        borderRadius : 7,
        margin : 10
    },
    button_save : {
        flex : 1,
        backgroundColor : '#55e9bc',
        padding : 10,
        borderRadius : 7,
        margin : 10
    }
})

export default styles