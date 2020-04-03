import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import Home from '../Components/Dashboard/Home'
import Detail from '../Components/Dashboard/Detail'
import Search from '../Components/Dashboard/Search'

const screens = {
    Home : {
        screen : Home,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    },
    DetailList : {
        screen : Detail
    }
}

const HomeStack = createStackNavigator(screens)

export default HomeStack