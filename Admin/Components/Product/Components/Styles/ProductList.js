import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    header_searchbar : {
        backgroundColor : '#61c0bf'
    },
    column_searchbar : {
        borderRadius : 5
    },
    button_add_product : {
        position : 'absolute',
        bottom : 20,
        left : 20,
        backgroundColor : '#61c0bf'
    },
    row : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    text_qty : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
    },
    button_detail : {
        backgroundColor : '#61c0bf',
        borderRadius : 5,
        marginTop : 8
    }
})

export default styles