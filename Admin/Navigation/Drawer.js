import React from 'react'
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import {createAppContainer} from 'react-navigation'
import HomeStack from './HomeStack'
import InvoiceStack from './InvoiceStack'
import ProductStack from './ProductStack'
import InventoryStack from './InventoryStack'
import SalesStack from './SalesStack'
import MotorcycleStack from './MotorcycleStack'
import EmployeeStack from './EmployeeStack'
import {SafeAreaView,ScrollView,Image,View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerComponent = (props) => (
    <SafeAreaView style = {{flex : 1}}>
        <View style = {{height : 150,backgroundColor : '#fff',alignItems : 'center',justifyContent : 'center'}}>
            <Image source = {require('../Assets/Image/logo.png')} style = {{height : 120,width : 120}}/>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const RootDrawerNavigator = createDrawerNavigator({
    Beranda : {
        screen : HomeStack,
        navigationOptions : {
            title : 'Beranda',
            drawerIcon : () => (
                <Icon name="home" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Bon : {
        screen : InvoiceStack,
        navigationOptions : {
            title : 'Faktur Penjualan',
            drawerIcon : () => (
                <Icon name="receipt" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Barang : {
        screen : ProductStack,
        navigationOptions : {
            title : 'Produk',
            drawerIcon : () => (
                <Icon name="package-variant-closed" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Jenis_Kereta : {
        screen : MotorcycleStack,
        navigationOptions : {
            title : 'Jenis Kereta',
            drawerIcon : () => (
                <Icon name="motorbike" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Mekanik : {
        screen : EmployeeStack,
        navigationOptions : {
            title : 'Mekanik',
            drawerIcon : () => (
                <Icon name="account" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Penjualan : {
        screen : SalesStack,
        navigationOptions : {
            title : 'Penjualan',
            drawerIcon : () => (
                <Icon name="cash" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Persediaan : {
        screen : InventoryStack,
        navigationOptions : {
            title : 'Re-Stok Produk',
            drawerIcon : () => (
                <Icon name="playlist-check" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    }
},{
    contentComponent : CustomDrawerComponent
})

export default createAppContainer(RootDrawerNavigator)