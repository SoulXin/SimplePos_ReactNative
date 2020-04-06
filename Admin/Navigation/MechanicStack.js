import MechanicWork from '../Components/Mechanic/MechanicWork'
import MechanicList from '../Components/Mechanic/MechanicList'
import MechanicForm from '../Components/Mechanic/MechanicForm'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const screens = {
    MechanicWork : {
        screen : MechanicWork,
        navigationOptions : {
            title : 'Pendapatan Mekanik'
        }
    },
    MechanicList : {
        screen : MechanicList,
        navigationOptions : {
            title : 'List - List Mekanik'
        }
    },
    MechanicForm : {
        screen : MechanicForm,
        navigationOptions : {
            title : 'Tambah Mekanik'
        }
    }
}

const MechanicStack = createMaterialTopTabNavigator(screens)
export default MechanicStack