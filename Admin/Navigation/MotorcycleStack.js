import {createStackNavigator} from 'react-navigation-stack'
import MotorcycleList  from '../Components/Type/MotorcycleList'
import MotorcycleForm from '../Components/Type/MotorcycleForm'
import MotorcycleDetail from '../Components/Type/MotorcycleDetail'

const screens = {
    MotorcycleList : {
        screen : MotorcycleList,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    },
    MotorcycleDetail : {
        screen : MotorcycleDetail,
        navigationOptions : () => {
            return {
                title : 'Tampilan Detail Kereta'
            }
        }
    },
    MotorcycleForm : {
        screen : MotorcycleForm,
        navigationOptions : () => {
            return {
                title : 'Tambah Jenis Kereta Baru'
            }
        }
    }
}

const MotorcycleStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : {backgroundColor : '#61c0bf',height : 60}
    }
})

export default MotorcycleStack