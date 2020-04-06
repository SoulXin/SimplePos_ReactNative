import {createStackNavigator} from 'react-navigation-stack'
import Home from '../Components/Dashboard/Home'

const screens = {
    Home : {
        screen : Home,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    }
}

const HomeStack = createStackNavigator(screens)

export default HomeStack