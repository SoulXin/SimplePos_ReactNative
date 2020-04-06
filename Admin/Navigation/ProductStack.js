import {createStackNavigator} from 'react-navigation-stack'
import ProductList from '../Components/Product/ProductList'
import ProductForm from '../Components/Product/ProductForm'
import ProductDetail from '../Components/Product/ProductDetail'

const screens = {
    ProductList : {
        screen : ProductList,
        navigationOptions : () => {
            return {
                headerShown : false
            }
        }
    },
    ProductDetail : {
        screen : ProductDetail,
        navigationOptions : {
            title : 'Detail Produk',
        }
    },
    ProductForm : {
        screen : ProductForm,
        navigationOptions : {
            title : 'Tambah Produk',
        }
    }
}

const ProductStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerStyle : {backgroundColor : '#61c0bf',height : 60}
    }
})

export default ProductStack