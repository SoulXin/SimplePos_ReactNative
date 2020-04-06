import React,{useState,useCallback} from 'react'
import {  Button, ListItem, Body, Right, Text } from 'native-base';
import { View, FlatList,Modal,TouchableOpacity,ScrollView } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'
import styles from './Components/Styles/Daily'
import {formatMoney, date} from '../../Global_Functions/Functions'
import {
    handleOpen_Modal_Product,
    handleClose_Modal_Product,
    handleOpen_Modal_Mechanic,
    handleClose_Modal_Mechanic
} from './Components/Functions/Daily'

const Daily = () => {
    const [data,setData] = useState([]);
    const [show_Modal_Product,setShow_Modal_Product] = useState(false);
    const [show_Modal_Mechanic,setShow_Modal_Mechanic] = useState(false);
    const [temp_Detail,setTemp_Detail] = useState('');
    const [daily_Time,setDaily_Time] = useState('');

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/income/show_income/daily",{cancelToken : source.token});
                setData(response.data);
                setDaily_Time(response.data[0].date);

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

    const viewProduct = () => temp_Detail ? temp_Detail.map((list,index) => {
        return (
            <View style = {styles.row_child} key = {index}>
                <Text style = {styles.table_cell_2}>{list.product_name}</Text>
                <Text style = {styles.table_cell_1}>{list.qty}</Text>
                <Text style = {styles.table_cell_2}>Rp.{ formatMoney(list.product_price - list.product_capital)}</Text>
                <Text style = {styles.table_cell_2}>Rp.{ formatMoney((list.product_price - list.product_capital) * list.qty)}</Text>
            </View>
        )
    }) : null

    const viewMechanic = () => temp_Detail ? temp_Detail.map((list,index) => {
        return (
            <View style = {styles.row_child} key = {index}>
                <Text style = {styles.table_cell_1}>{list.motorcycle_code}</Text>
                <Text style = {styles.table_cell_1}>{list.product_name}</Text>
                <Text style = {styles.table_cell_1}>Rp.{ formatMoney(list.pay_mechanic)}</Text>
            </View>
        )
    }) : null;

    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <Text style = {{fontSize : 14}}>{item.code}</Text>
                    <Text  style = {styles.title_text}>Rp. {formatMoney(item.income)}</Text>
                </Body>
                <Right>
                    {
                        item.code.match(/Potongan.*/) ? 
                        <Button style = {styles.button_detail} onPress = {() => handleOpen_Modal_Mechanic(item.list_income,setShow_Modal_Mechanic,setTemp_Detail)}>
                            <Text>Detail</Text>
                        </Button> : 
                        <Button style = {styles.button_detail} onPress = {() => handleOpen_Modal_Product(item.list_income,setShow_Modal_Product,setTemp_Detail)}>
                            <Text>Detail</Text>
                        </Button>
                    }
                </Right>
            </ListItem>
        )
    }

    return (
        <View style = {styles.container}>
            {
                data.length ? 
                <View style = {styles.top_header_invoice}>
                    <Text>Tanggal : {date(data[0].date)}</Text>
                    <Text style = {styles.title_text}>Pendapatan Harian</Text>
                </View> : null
            }
            {/* Product */}
            <Modal visible = {show_Modal_Product}>
                <View style = {styles.container}>
                    <View style = {styles.table_header}>
                        <Text style = {styles.table_cell_2}>Nama Produk</Text>
                        <Text style = {styles.table_cell_1}>Qty</Text>
                        <Text style = {styles.table_cell_2}>Harga</Text>
                        <Text style = {styles.table_cell_2}>Total</Text>
                    </View>
                    <View style = {styles.container_modal}>
                        <View style = {{flex : 8}}>
                            <ScrollView>
                                {viewProduct()}
                            </ScrollView>
                        </View>

                        <View style = {styles.container_button}>
                            <TouchableOpacity style = {styles.button_ok} onPress = {() => handleClose_Modal_Product(setShow_Modal_Product,setTemp_Detail)}>
                                <Text style = {{textAlign : 'center'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            {/* Mechanic */}
            <Modal visible = {show_Modal_Mechanic}>
                <View style = {styles.container}>
                    <View style = {styles.table_header}>
                        <Text style = {styles.table_cell_1}>BK Motor</Text>
                        <Text style = {styles.table_cell_1}>Nama</Text>
                        <Text style = {styles.table_cell_1}>Harga</Text>
                    </View>
                    <View style = {styles.container_modal}>
                        <View style = {{flex : 8}}>
                            <ScrollView>
                                {viewMechanic()}
                            </ScrollView>
                        </View>

                        <View style = {styles.container_button}>
                            <TouchableOpacity style = {styles.button_ok} onPress = {() => handleClose_Modal_Mechanic(setShow_Modal_Mechanic,setTemp_Detail)}>
                                <Text style = {{textAlign : 'center'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data = {data}
                renderItem = {_renderItem}
            />
        </View>
    )
}

export default Daily