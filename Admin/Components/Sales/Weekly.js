import React,{useState,useCallback} from 'react'
import { View,FlatList, Modal,ScrollView,TouchableOpacity} from 'react-native'
import { Container, List, Button, ListItem,  Body, Right, Text } from 'native-base';
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {formatMoney,date} from '../../Global_Functions/Functions'
import {handleDetail} from './Components/Functions/Weekly'
import styles from './Components/Styles/Weekly'

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

    const viewList_Order_Daily = () => detailData ? detailData.map((list,index) => {
        var  temp_total = [];
        list.list_order_daily.map(list_daily => {
            return temp_total.push(list_daily.order.total);
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);
        
        return(
            <View style = {styles.row_child} key = {index}>
                <Text style = {styles.text}> {date(list.date_order)}</Text>
                <Text style = {styles.text}>Rp. {formatMoney(sum_total)}</Text>
            </View>
        )
    }):null;

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
                    <Text style = {styles.title_text}>Rp. {formatMoney(sum_total)}</Text>
                </Body>
                <Right>
                    <Button style = {styles.button_detail} onPress = {() => handleDetail(item.list_order_week,setShowModalDetail,setDetailData)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <Container>
            <Modal visible = {showModalDetail}>
                <View style = {styles.container}>
                    <View style = {styles.table_header}>
                        <Text style = {styles.table_cell_1}>Tanggal</Text>
                        <Text style = {styles.table_cell_1}>Hasil Penjualan</Text>
                    </View>
                    {/* List */}
                    <View style = {{flex : 10}}>
                        <ScrollView>
                            {viewList_Order_Daily()}
                        </ScrollView>
                    </View>

                    {/* Button */}
                    <View style = {styles.button_container}>
                        <TouchableOpacity style = {styles.button_ok} onPress = {() => setShowModalDetail(false)}>
                            <Text style = {{textAlign : 'center'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <List>
                <View style = {styles.top_header_invoice}>
                    <Text style = {styles.title_text}>Penjualan Mingguan</Text>
                </View>
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