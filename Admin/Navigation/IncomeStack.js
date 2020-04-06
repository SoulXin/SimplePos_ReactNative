import Daily from '../Components/Income/Daily'
import Weekly from '../Components/Income/Weekly'
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