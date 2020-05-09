import Daily_Income from '../../Components/Income/Daily'
import Weekly_Income from '../../Components/Income/Weekly'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const IncomeTopNav = createMaterialTopTabNavigator({
    Daily_Income : {
        screen : Daily_Income,
        navigationOptions : {
            title : 'Harian'
        }
    },
    Weekly_Income : {
        screen : Weekly_Income,
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

export default IncomeTopNav