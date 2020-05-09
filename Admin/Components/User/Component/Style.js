import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    container_notification : {
        flexDirection : 'row',
        borderWidth : 1,
        padding : 10,
        borderRadius : 7,
        borderColor : 'green'
    },
    title_header : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    title_name : {
        fontWeight : 'bold',
        margin : 5,
        fontSize : 16
    },
    active_change : {
        flexDirection : 'row',
        borderWidth : 1,
        borderRadius : 7
    },
    input_name : {
        fontSize : 16,
        padding : 10,
        flex  :1
    },
    title : {
        fontWeight : 'bold',
        padding : 5,
        marginTop : 10,
        fontSize : 16
    },
    email : {
        fontSize : 18,
        marginLeft : 5  
    },
    container_change_password : {
        padding : 10,
        margin : 5,
        marginTop : 20,
        borderRadius : 7,
        backgroundColor : '#61c0bf'
    },
    title_change_password : {
        fontWeight : 'bold',
        fontSize : 20,
        textAlign : 'center',
        color : 'white'
    },
    container_old_password : {
        flexDirection : 'row',
        borderWidth : 1,
        borderRadius : 7
    },
    input_old_password : {
        fontSize : 16,
        padding : 10,
        flex : 1
    },
    input_password : {
        borderWidth : 1,
        fontSize : 16,
        padding : 10,
        borderRadius : 7
    },
    button_change : {
        padding : 10,
        borderRadius : 5,
        margin : 15,
        alignItems : 'center',
        backgroundColor : '#61c0bf',
        borderWidth : 3,
        borderColor : 'white'
    },
    button_logout : {
        padding : 10,
        borderRadius : 5,
        backgroundColor : '#ff9999',
        margin : 5,
        alignItems : 'center'
    },
    container_medsos : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginTop : 10
    },
    button_sosmed : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#61c0bf',
        padding : 10,
        borderRadius : 7
    },
    text_sosmed : {
        marginLeft : 10,
        fontWeight : 'bold',
        color : 'white',
        fontSize : 14
    },
    container_loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    error_change : {
        padding : 50,
        margin : 10,
        borderRadius : 10,
        backgroundColor : '#ff9999'
    },
    success_change : {
        padding : 50,
        margin : 10,
        borderRadius : 10,
        backgroundColor : '#17b978'
    },
    loading_text : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : 16,
        textAlign : 'center',
    },
    text_button : {
        color : 'white',
        fontSize : 14
    }
})

export default styles