import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,ScrollView,TouchableOpacity } from 'react-native'
import { List, Button, ListItem, Body, Right, Text } from 'native-base';
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {formatMoney,date} from '../../Global_Functions/Functions'
import { handleDetail,handleCloseModalDetail} from './Components/Functions/Daily'
import styles from './Components/Styles/Daily'

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

    const viewOrder = () => detailData ? detailData.product.map((list,index) => {
        return (
            <View style = {styles.row_child} key = {index}>
                <Text style = {styles.table_cell_2}>{list.product_name}</Text>
                <Text style = {styles.table_cell_1}>{list.qty}</Text>
                <Text style = {styles.table_cell_2}>Rp.{formatMoney(list.product_price)}</Text>
                <Text style = {styles.table_cell_2}>Rp.{formatMoney(list.product_price * list.qty)}</Text>
            </View>
        )
    }) : null

    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <Text style = {{fontSize : 14}}>{item.order.bk}</Text>
                    <Text  style = {styles.main_title}>Rp. {formatMoney(item.order.total)}</Text>
                </Body>
                <Right>
                    <Button style = {styles.button_detail} onPress = {() =>handleDetail(item.order,setShowModalDetail,setDetailData)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <View style = {styles.container}>
            <Modal visible = {showModalDetail}>
                <View style = {styles.container_modal}>
                    <View style = {styles.container_box_modal_detail}>
                        <View style = {{flex : 2}}>
                            <View style = {styles.row}>
                                <Text style = {styles.cell}>BK</Text>
                                <Text> : </Text>
                                <Text style = {styles.cell}>{detailData.bk}</Text>
                            </View>
                            <View style = {styles.row}>
                                <Text style = {styles.cell}>Mekanik</Text>
                                <Text> : </Text>
                                <Text style = {styles.cell}>{detailData.mechanic}</Text>
                            </View>
                            <View style = {styles.row}>
                                <Text style = {styles.cell}>Total</Text>
                                <Text> : </Text>
                                <Text style = {styles.cell}>{formatMoney(detailData.total)}</Text>
                            </View>
                        </View>

                        <View style = {styles.cell}>
                            <Text style = {{justifyContent : 'flex-end'}}></Text>
                        </View>
                    </View>

                    {/* Table Header */}
                    <View style = {styles.table_header}>
                        <Text style = {styles.table_cell_2}>Nama Produk</Text>
                        <Text style = {styles.table_cell_1}>Qty</Text>
                        <Text style = {styles.table_cell_2}>Harga</Text>
                        <Text style = {styles.table_cell_2}>Total</Text>
                    </View>

                    {/* List */}
                    <View style = {{flex : 7}}>
                        <ScrollView>
                            {viewOrder()}
                        </ScrollView>
                    </View>
                    
                    {/* Button */}
                    <View style = {styles.container_button}>
                        <TouchableOpacity style = {styles.button_ok} onPress = {() => handleCloseModalDetail(setDetailData,setShowModalDetail)}>
                            <Text style = {{textAlign : 'center'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <List>
                {   data.length ? 
                    <View  style = {styles.top_header_invoice}>
                        <Text>Tanggal : {date(data[0].date_order)}</Text>
                        <Text style = {styles.main_title}>Penjualan Harian</Text>
                    </View>
                     : null
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