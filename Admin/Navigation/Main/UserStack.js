import {createStackNavigator} from 'react-navigation-stack'
import User from '../../Components/User/Index'

const screens = {
    User : {
        screen : User,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    }
}

const UserStack = createStackNavigator(screens)

export default UserStack