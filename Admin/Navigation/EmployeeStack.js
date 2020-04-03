import EmployeeWork from '../Components/Employee/EmployeeWork'
import EmployeeList from '../Components/Employee/EmployeeList'
import EmployeeForm from '../Components/Employee/EmployeeForm'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const screens = {
    EmployeeWork : {
        screen : EmployeeWork,
        navigationOptions : {
            title : 'Pendapatan Mekanik'
        }
    },
    EmployeeList : {
        screen : EmployeeList,
        navigationOptions : {
            title : 'List - List Mekanik'
        }
    },
    EmployeeForm : {
        screen : EmployeeForm,
        navigationOptions : {
            title : 'Tambah Mekanik'
        }
    }
}

const EmployeeStack = createMaterialTopTabNavigator(screens)
export default EmployeeStack