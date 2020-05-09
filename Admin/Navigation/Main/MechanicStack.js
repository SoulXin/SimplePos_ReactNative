import MechanicWork from '../../Components/Mechanic/MechanicWork'
import MechanicList from '../../Components/Mechanic/MechanicList'
import MechanicForm from '../../Components/Mechanic/MechanicForm'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const MechanicTopNav = createMaterialTopTabNavigator({
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
},{
    tabBarOptions : {
        activeTintColor : 'black',
        inactiveTintColor : 'white',
        style : {
            borderTopColor : '#fff',
            shadowColor : '#a1aab8',
            backgroundColor : '#61c0bf',
            height : 55
        }
    }
})

export default MechanicTopNav