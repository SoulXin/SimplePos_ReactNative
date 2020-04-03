import {createStackNavigator} from 'react-navigation-stack'
import ProductList from '../Components/Product/ProductList'
import ProductForm from '../Components/Product/ProductForm'
import ProductDetail from '../Components/Product/ProductDetail'

const screens = {
    ProductList : {
        screen : ProductList
    },
    ProductDetail : {
        screen : ProductDetail
    },
    ProductForm : {
        screen : ProductForm
    }
}

const ProductStack = createStackNavigator(screens,{
    defaultNavigationOptions : {
        headerShown : false
    }
})

export default ProductStack