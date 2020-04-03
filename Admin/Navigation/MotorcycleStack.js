import {createStackNavigator} from 'react-navigation-stack'
import MotorcycleList  from '../Components/Type/MotorcycleList'
import MotorcycleForm from '../Components/Type/MotorcycleForm'
import MotorcycleDetail from '../Components/Type/MotorcycleDetail'

const screens = {
    MotorcycleList : {
        screen : MotorcycleList
    },
    MotorcycleDetail : {
        screen : MotorcycleDetail
    },
    MotorcycleForm : {
        screen : MotorcycleForm
    }
}

const MotorcycleStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerShown : false
    }
})

export default MotorcycleStack