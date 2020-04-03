import {createStackNavigator} from 'react-navigation-stack'
import Index from '../Components/Inventory/Index'

const screens = {
    Inventory : {
        screen : Index,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    }
}

const InventoryStack = createStackNavigator(screens)

export default InventoryStack