import React,{useState,useCallback} from 'react'
import { View,FlatList, ActivityIndicator,Modal,ScrollView,TouchableOpacity,TextInput, Alert} from 'react-native'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {formatMoney,date} from './Components/Functions'

const Index = () => {
    const [data,setData] = useState([]);
    const [showModalDetail,setShowModalDetail] = useState(false);
    const [detailData,setDetailData] = useState('');

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/sales/show_sales/daily",{cancelToken : source.token});
                setData(response.data)
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

    const handleDetail = (item) => {
        setShowModalDetail(true);
        setDetailData(item);
    }

    const viewOrder = () => detailData ? detailData.product.map((list,index) => {
        return (
            <View style = {{flexDirection : 'row',alignItems : 'center',margin : 5,padding : 10,borderRadius : 7,borderWidth : 1}} key = {index}>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.product_name}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.qty}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.product_price}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.product_price * list.qty}</Text>
            </View>
        )
    }) : null

    const handleCloseModalDetail = () => {
        setDetailData('');
        setShowModalDetail(false);
    }
    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <Text style = {{fontSize : 14}}>{item.order.bk}</Text>
                    <Text  style = {{fontWeight : 'bold',fontSize : 20}}>Rp. {formatMoney(item.order.total)}</Text>
                    {/* <Text note>Jual     :  Rp. {formatMoney(item.product_price)}</Text> */}
                </Body>
                <Right>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,marginTop : 8}} onPress = {() =>handleDetail(item.order)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <View style = {{flex : 1,margin : 10}}>
            <Modal visible = {showModalDetail}>
                <View style = {{flex : 1,margin : 10}}>
                    <View style = {{flexDirection : 'row',padding : 10,borderRadius : 7,backgroundColor : '#e3fdfd'}}>
                        <View style = {{flex : 2}}>
                            <View style = {{flexDirection : 'row'}}>
                                <Text style = {{flex : 1}}>BK</Text>
                                <Text> : </Text>
                                <Text style = {{flex : 1}}>{detailData.bk}</Text>
                            </View>
                            <View style = {{flexDirection : 'row'}}>
                                <Text style = {{flex : 1}}>Mekanik</Text>
                                <Text> : </Text>
                                <Text style = {{flex : 1}}>{detailData.mechanic}</Text>
                            </View>
                            <View style = {{flexDirection : 'row'}}>
                                <Text style = {{flex : 1}}>Total</Text>
                                <Text> : </Text>
                                <Text style = {{flex : 1}}>{formatMoney(detailData.total)}</Text>
                            </View>
                        </View>

                        <View style = {{flex : 1}}>
                            <Text style = {{justifyContent : 'flex-end'}}></Text>
                        </View>
                    </View>

                    {/* List */}
                    <View style = {{flexDirection : 'row',alignItems : 'center',marginTop : 5,marginBottom : 5, padding : 10,borderRadius : 7,backgroundColor : '#e3fdfd'}}>
                        <Text style = {{flex : 1,textAlign : 'center'}}>Nama Produk</Text>
                        <Text style = {{flex : 1,textAlign : 'center'}}>Jumlah</Text>
                        <Text style = {{flex : 1,textAlign : 'center'}}>Harga</Text>
                        <Text style = {{flex : 1,textAlign : 'center'}}>Total</Text>
                    </View>
                    <View style = {{height : 385}}>
                        <ScrollView>
                            {viewOrder()}
                        </ScrollView>
                    </View>
                    <View style = {{position : 'absolute',bottom : 0,width : '100%'}}>
                        <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 5}} onPress = {handleCloseModalDetail}>
                            <Text style = {{textAlign : 'center'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <List>
                {
                    data.length ? 
                    <View style = {{flexDirection : 'row',borderBottomWidth : 1,paddingBottom : 10,paddingTop : 10}}>
                        <Text style = {{flex : 1}}>{date(data[0].date_order)}</Text>
                        <Text style = {{flex : 1,textAlign : 'right'}}>{data[0].order.length}</Text>
                    </View> : null
                }
                
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data = {data}
                    renderItem = {_renderItem}
                />
            </List>
        </View>
    )
}

export default Index
