import Daily_Sales from '../../Components/Sales/Daily'
import Weekly_Sales from '../../Components/Sales/Weekly'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const SalesTopNav = createMaterialTopTabNavigator ({
    Daily_Sales : {
        screen : Daily_Sales,
        navigationOptions : {
            title : 'Harian'
        }
    },
    Weekly_Sales : {
        screen : Weekly_Sales,
        navigationOptions : {
            title : 'Mingguan'
        }
    }
},{
    tabBarOptions : {
        activeTintColor : 'black',
        inactiveTintColor : 'white',
        style : {
            borderTopColor : '#fff',
            shadowColor : '#a1aab8',
            backgroundColor : '#61c0bf',
            height : 50
        }
    }
})

export default SalesTopNav