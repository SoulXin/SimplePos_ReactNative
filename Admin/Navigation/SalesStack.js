import Daily from '../Components/Sales/Daily'
import Weekly from '../Components/Sales/Weekly'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const screens = {
    Daily : {
        screen : Daily,
        navigationOptions : {
            title : 'Harian'
        }
    },
    Weekly : {
        screen : Weekly,
        navigationOptions : {
            title : 'Mingguan'
        }
    }
}

const SalesStack = createMaterialTopTabNavigator(screens)
export default SalesStack