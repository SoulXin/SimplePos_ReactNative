import React,{useState,useCallback} from 'react'
import { View, FlatList,Modal,TouchableOpacity,ScrollView } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import {  Button, ListItem, Body, Right, Text } from 'native-base';
import axios from 'axios'
import {formatMoney,date} from '../../Global_Functions/Functions'
import styles from './Components/Styles/Daily'

const Weekly = () => {
    const [data,setData] = useState([]);
    const [show_Modal_Detail,setShow_Modal_Detail] = useState(false);
    const [temp_Detail,setTemp_Detail] = useState('');
    
    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/income/show_income/weekly",{cancelToken : source.token});
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
    
    const handleShow_Modal_Detail = (item) => {
        setShow_Modal_Detail(true)
        setTemp_Detail(item);
    }

    const handleClose_Modal_Detail = () => {
        setShow_Modal_Detail(false);
        setTemp_Detail('');
    }

    const _renderItem = ({item,index }) => {
        var  temp_total = [];
        item.list_income_week.map(list => {
            list.list_income_daily.map(list_daily => {
                list_daily.order.map(list_order => {
                    if(list_order.product_price){
                        temp_total.push((list_order.product_price - list_order.product_capital) * list_order.qty)
                    }else{
                        temp_total.push(list_order.pay_mechanic)
                    }
                })
            })
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);

        return (
            <ListItem avatar>
                <Body>
                    <Text style = {{fontSize : 14}}>Minggu Ke {item._id}</Text>
                    <Text  style = {styles.title_text}>Rp. {formatMoney(sum_total)}</Text>
                </Body>
                <Right>
                    <Button style = {styles.button_detail} onPress = {() => handleShow_Modal_Detail(item.list_income_week)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    const view_Weekly_Income = () => temp_Detail ? temp_Detail.map((list,index) => {
        var  temp_total = [];

        list.list_income_daily.map(list_daily => {
            list_daily.order.map(list_order => {
                if(list_order.product_price){
                    temp_total.push((list_order.product_price - list_order.product_capital) * list_order.qty)
                }else{
                    temp_total.push(list_order.pay_mechanic)
                }
            })
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);

        return (
            <View style = {styles.row_child} key = {index}>
                <Text style = {styles.table_cell_1}>{date(list.date)}</Text>
                <Text style = {styles.table_cell_1}>Rp.{formatMoney(sum_total)}</Text>
            </View>
        )
    }) : null

    return (
        <View style = {styles.container}>
            <Modal visible = {show_Modal_Detail}>
                <View style = {styles.container}>
                    <View style = {styles.table_header}>
                        <Text style = {styles.table_cell_1}>Tanggal</Text>
                        <Text style = {styles.table_cell_1}>Pendapatan Bersih</Text>
                    </View>
                    <View style = {styles.container_modal}>
                        <View style = {{flex : 8}}>
                            <ScrollView>
                                {view_Weekly_Income()}
                            </ScrollView>
                        </View>

                        <View style = {styles.container_button}>
                            <TouchableOpacity style = {styles.button_ok} onPress = {handleClose_Modal_Detail}>
                                <Text style = {{textAlign : 'center'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style = {styles.top_header_invoice}>
                <Text style = {styles.title_text}>Pendapatan Mingguan</Text>
            </View>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data = {data}
                renderItem = {_renderItem}
            />
        </View>
    )
}

export default Weekly
