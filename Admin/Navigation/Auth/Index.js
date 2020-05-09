import {createStackNavigator} from 'react-navigation-stack'
import Login from '../../Components/Auth/Login'
import Register from '../../Components/Auth/Register'

const AuthStack = createStackNavigator({
    Login : {
        screen : Login,
        navigationOptions : () => {
            return {
                headerShown: false

            }
        },
    },
    Register : {
        screen : Register,
        navigationOptions : () => {
            return {
                headerShown: false

            }
        }
    }
})

export default AuthStack