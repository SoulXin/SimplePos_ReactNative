import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    container_button : {
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        flex : 1
    },
    container_column : {
        flexDirection : 'column',
        flex : 1
    },
    row : {
        flexDirection : 'row'
    },
    button_back : {
        backgroundColor : '#61c0bf',
        padding : 10,
        margin : 10,
        borderRadius : 10
    },
    button_complete : {
        backgroundColor : '#55e9bc',
        padding : 10,
        margin : 10,
        borderRadius : 10
    },
    button_detail : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        margin : 2
    },
    row_child : {
        flexDirection : 'row',
        borderWidth : 1,
        borderRadius : 7,
        padding : 10,
        margin : 5
    },


})

export default styles