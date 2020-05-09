import {createStackNavigator} from 'react-navigation-stack'
import Index from '../../Components/Inventory/Index'

const screens = {
    Inventory : {
        screen : Index,
        navigationOptions : {
            title : 'Re-Stok Barang',
        }
    }
}

const InventoryStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : {backgroundColor : '#61c0bf',height : 60}
    }
})

export default InventoryStack