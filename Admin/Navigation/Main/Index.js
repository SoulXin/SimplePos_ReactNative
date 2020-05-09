import React,{useState} from 'react'
import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
import HomeStack from './HomeStack'
import InvoiceStack from './InvoiceStack'
import ProductStack from './ProductStack'
import InventoryStack from './InventoryStack'
import SalesStack from './SalesStack'
import MotorcycleStack from './MotorcycleStack'
import MechanicStack from './MechanicStack'
import IncomeStack from './IncomeStack'
import {SafeAreaView,ScrollView,Image,View,AsyncStorage,Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserStack from './UserStack'

const checkUserSignedIn = async () =>{
    try {
       let value = await AsyncStorage.getItem('data_login');
        if (value != null){
            // do something
            let value_parse = JSON.parse(value);
            return value_parse.user.name
        }else{
            navigation.navigate('Login')
        }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
}

const CustomDrawerComponent = (props) => {
    const [name,setName] = useState('');
    const [width,setWidth] = useState(135);
    const [height,setHeight] = useState(0);

        checkUserSignedIn()
        .then(res => {
            setName(res);
        })
        .catch(err => {
            console.log(err)
        })
    
    const resizeImage = (e) => {
        let widthOrigin = e.nativeEvent.source.width;
        let heightOrigin = e.nativeEvent.source.height;
        let aspecRatio = widthOrigin / heightOrigin;
        setHeight(width / aspecRatio);
    }
    return (
    <SafeAreaView style = {{flex : 1}}>
        <View style = {{height : 150,backgroundColor : '#fff',alignItems : 'center',justifyContent : 'center'}}>
            <Image 
                source = {require('../../Assets/Image/logo.png')}
                onLoad = {(e) => resizeImage(e)}
                style = {{width : width,height : height}}
            />
    <Text style = {{fontWeight : 'bold',color : '#61c0bf',fontSize : 20}}>{name}</Text>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)}

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
        screen : MechanicStack,
        navigationOptions : {
            title : 'Mekanik',
            drawerIcon : () => (
                <Icon name="account-tie" style = {{fontSize : 24,color : '#61c0bf'}}/>
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
    Pendapatan : {
        screen : IncomeStack,
        navigationOptions : {
            title : 'Pendapatan',
            drawerIcon : () => (
                <Icon name="cash-multiple" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    },
    Akun : {
        screen : UserStack,
        navigationOptions : {
            title : 'Akun',
            drawerIcon : () => (
                <Icon name="account" style = {{fontSize : 24,color : '#61c0bf'}}/>
            )
        }
    }
},{
    contentComponent : CustomDrawerComponent
})

export default RootDrawerNavigator