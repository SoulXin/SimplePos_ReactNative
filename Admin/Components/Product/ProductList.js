import React, { useEffect, useState,useCallback } from 'react'
import { View, TouchableOpacity,FlatList } from 'react-native'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios'
import _ from 'lodash'
import { useFocusEffect } from 'react-navigation-hooks'

const ProductList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [fullData,setFullData] = useState([]);

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/product/show_product",{cancelToken : source.token});
                setData(response.data);
                setFullData(response.data);
            }catch (error) {
                if(axios.isCancel(error)){
                    console.log("Response has been cancel TableList")
                }else{
                    throw error
                }
            }
        };
        loadData();
        return () => {
            source.cancel();
        }
    },[]));

    function formatMoney(amount, thousands = ".") {
        try {
          const negativeSign = amount < 0 ? "-" : "";
          let i = parseInt(amount = Math.abs(Number(amount) || 0)).toString();
          let j = (i.length > 3) ? i.length % 3 : 0;
      
          return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + "";
        } catch (e) {
          console.log(e)
        }
    };

    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <View style = {{flexDirection : 'row',alignItems : 'center'}}>
                        <View style = {{flex : 1}}>
                            <Text style = {{fontSize : 20,fontWeight : 'bold',textAlign : 'center'}}>{item.qty}</Text>
                        </View>

                        <View style = {{flex : 4}}>
                            <Text>{item.product_name}</Text>
                            <Text note>Modal :  Rp. {formatMoney(item.product_capital)}</Text>
                            <Text note>Jual     :  Rp. {formatMoney(item.product_price)}</Text>
                        </View>
                    </View>
                </Body>
                <Right>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,marginTop : 8}}  onPress = {() => navigation.navigate('ProductDetail',item)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
    const handleSearch = (text) => {
        const formattedQuery = text.toLowerCase();
        const data = _.filter(fullData,list => {
            if(list.product_name.toLowerCase().includes(formattedQuery)){
                return true
            }
            return false
        })
        setData(data)
    }
    return (
        <Container>
            <Header searchBar style = {{backgroundColor : '#61c0bf'}}>
                <Item style = {{borderRadius : 5}}>
                    <Input placeholder= "Cari Produk" onChangeText = {handleSearch}/>
                </Item>
            </Header>

            <List>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>

            <Button rounded style = {{position : 'absolute',bottom : 20,left : 20,backgroundColor : '#61c0bf'}} onPress = {() => navigation.navigate('ProductForm')}>
                <Text>Tambah Produk</Text>
            </Button>
        </Container>
    )
}

export default ProductList
