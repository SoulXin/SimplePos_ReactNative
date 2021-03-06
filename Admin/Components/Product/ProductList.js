import React, { useState,useCallback } from 'react'
import { View,FlatList,SafeAreaView } from 'react-native'
import { Container, Header,  List, Item, Input, Button, ListItem, Body, Right, Text } from 'native-base';
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {formatMoney, checkUserSignedIn,clear_AsyncStorage} from '../../Global_Functions/Functions'
import { handleSearch } from './Components/Functions/ProductList'
import styles from './Components/Styles/ProductList';
import Loading from '../Modal_Loading/Loading'

const ProductList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [fullData,setFullData] = useState([]);
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/product/show_product/${res.user._id}`,{cancelToken : source.token});
                    setData(response.data);
                    setFullData(response.data);
                    setLoading(false);
                }catch (error) {
                    setLoading(false);
                    if(axios.isCancel(error)){
                        console.log("Response has been cancel TableList")
                    }else{
                        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
                    }
                }
            };
            loadData();
        })
        .catch(err => {
            setLoading(false);
            clear_AsyncStorage(navigation);
        })
        return () => {
            source.cancel();
            setData([]);
            setFullData([]);
        }
    },[]));

    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <View style = {styles.row}>
                        <View style = {{flex : 1}}>
                            <Text style = {styles.text_qty}>{item.qty}</Text>
                        </View>

                        <View style = {{flex : 4}}>
                            <Text>{item.product_name}</Text>
                            <Text note>Modal :  Rp. {formatMoney(item.product_capital)}</Text>
                            <Text note>Jual     :  Rp. {formatMoney(item.product_price)}</Text>
                        </View>
                    </View>
                </Body>
                <Right>
                    <Button style = {styles.button_detail}  onPress = {() => navigation.navigate('ProductDetail',item)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <Container>
            <Loading loading = {loading}/>
            <Header searchBar style = {styles.header_searchbar}>
                <Item style = {styles.column_searchbar}>
                    <Input placeholder= "Cari Produk" onChangeText = {(text) => handleSearch(text,fullData,setData)}/>
                </Item>
            </Header>

            <SafeAreaView  style = {{flex : 1}}>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </SafeAreaView>

            <Button rounded style = {styles.button_add_product} onPress = {() => navigation.navigate('ProductForm')}>
                <Text>Tambah Produk</Text>
            </Button>
        </Container>
    )
}

export default ProductList