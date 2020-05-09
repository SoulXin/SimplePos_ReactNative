import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Auth from './Auth/Index'
import Main from './Main/Index'

const Stack = createStackNavigator({
    Auth : {
        screen : Auth,
        navigationOptions : () => {
            return {
                headerShown: false
            }
        },
    },
    Main : {
        screen : Main,
        navigationOptions : () => {
            return {
                headerShown: false
            }
        },
    } 
})

export default createAppContainer(Stack)