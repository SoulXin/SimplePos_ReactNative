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
                const response = await axios.get("http://192.168.43.171:5000/sales/show_sales/weekly",{cancelToken : source.token});
                setData(response.data);
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

    const viewList_Order_Daily = () => detailData ? detailData.map((list,index) => {
        var  temp_total = [];
        list.list_order_daily.map(list_daily => {
            return temp_total.push(list_daily.order.total);
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);
        
        return(
            <View style = {{flexDirection : 'row',padding : 10,borderRadius : 7,borderWidth : 1,margin : 5}} key = {index}>
                <Text style = {{flex : 1,textAlign : 'center'}}> {date(list.date_order)}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(sum_total)}</Text>
            </View>
        )
    }):null

    const _renderItem = ({item,index }) => {
        var  temp_total = [];
        item.list_order_week.map(list => {
            list.list_order_daily.map(list_daily => {
                return temp_total.push(list_daily.order.total);
            })
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);

        return (
            <ListItem avatar>
                <Body>
                    <Text style = {{fontSize : 14}}>Minggu Ke  {item._id}</Text>
                    <Text style = {{fontWeight : 'bold',fontSize : 20}}>Rp. {formatMoney(sum_total)}</Text>
                </Body>
                <Right>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,marginTop : 8}} onPress = {() => handleDetail(item.list_order_week)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <Container>
            <Modal visible = {showModalDetail}>
                <View style = {{flex : 1,margin : 10}}>
                    <ScrollView>
                        {viewList_Order_Daily()}
                    </ScrollView>
                    <View style = {{position : 'absolute',bottom : 0,width : '100%'}}>
                        <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 5}} onPress = {() => setShowModalDetail(false)}>
                            <Text style = {{textAlign : 'center'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <List>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data = {data}
                    renderItem = {_renderItem}
                />
            </List>
        </Container>
    )
}

export default Index