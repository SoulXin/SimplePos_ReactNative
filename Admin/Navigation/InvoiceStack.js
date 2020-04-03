import {createStackNavigator} from 'react-navigation-stack'
import InvoiceList from '../Components/Invoice/InvoiceList'
import InvoiceForm from '../Components/Invoice/InvoiceForm'
import InvoiceDetail from '../Components/Invoice/InvoiceDetail'

const screens = {
    InvoiceList : {
        screen : InvoiceList,
        navigationOptions : {
            title : 'Daftar Faktur Penjualan',
        }
    },
    InvoiceDetail : {
        screen : InvoiceDetail,
        navigationOptions : {
            title : 'Detail Faktur Penjualan'
        }
    },
    InvoiceForm : {
        screen : InvoiceForm,
        navigationOptions : {
            title : 'Buka Faktur Baru'
        }
    }
}

const InvoiceStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : {backgroundColor : '#61c0bf',height : 60}
    }
})

export default InvoiceStack