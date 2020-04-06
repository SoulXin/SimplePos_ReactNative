import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Container, List, Button, ListItem, Body, Right,Text } from 'native-base';
import {formatMoney} from '../../Global_Functions/Functions'
import { handleShowModalDelete,handleDelete } from './Components/Functions/InvoiceList'
import styles from './Components/Styles/InvoiceList'

const InvoiceList = ({navigation}) => {
    // Data
    const [data,setData] = useState([]);

    // Temporary Data
    const [temp_id,setTemp_Id] = useState('');
    const [temp_bk,setTemp_Bk] = useState('');

    // Modal
    const [showModalDelete,setShowModalDelete] = useState(false);

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/invoice/show_invoice",{cancelToken : source.token});
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

    const _renderItem = ({item,index }) => {
        var  temp_total = [];
        var temp_total_pay_mechanic = [];

        // Total Bill
        item.product.map(list => {
            return temp_total.push(list.product_price * list.qty);
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);

        // Total Pay Mechanic
        item.product.map(list => {
            return temp_total_pay_mechanic.push(list.pay_mechanic);
        })
        var sum_total_pay_mechanic = temp_total_pay_mechanic.reduce(function(a, b){
            return a + b;
        }, 0);

        const data = {
            mechanic : item.mechanic,
            bk : item.bk,
            date_order : item.date_order,
            invoice_id : item._id
        }
    
        return (
            <ListItem avatar>
                <Body>
                    <Text>{item.bk}</Text>
                    <Text>Rp. {formatMoney(sum_total + sum_total_pay_mechanic)}</Text>
                    <Text note>Mekanik : {item.mechanic}</Text>
                </Body>
                <Right>
                    <View style = {styles.row_invoice}>
                        <Button style = {styles.button_delete_invoice}  onPress = {() => handleShowModalDelete(item._id,item.bk,setShowModalDelete,setTemp_Id,setTemp_Bk)}>
                            <Text>Hapus</Text>
                        </Button>
                        <Button style = {styles.button_detail_invoice}  onPress = {() => navigation.navigate('InvoiceDetail',data)}>
                            <Text>Detail</Text>
                        </Button>
                    </View>
                </Right>
            </ListItem>
        )
    }

    return (
        <Container>
            <Modal visible = {showModalDelete} transparent>
                <View style = {styles.container_modal_delete}>
                    <View style = {styles.container_box_modal_delete}>
                        <Text style = {styles.title_modal}>Hapus Tagihan Ini ?</Text>
                        <Text style = {styles.title_modal}>{temp_bk}</Text>
                        <View style = {styles.row_modal_delete}>
                            <View style = {{flex : 1}}>
                                <TouchableOpacity onPress = {() => setShowModalDelete(false)} style = {styles.button_close_modal_delete}>
                                    <Text>Tidak</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {{flex : 1}}>
                                <TouchableOpacity onPress = {() => handleDelete(data,temp_id,setShowModalDelete,setData)} style = {styles.button_delete_modal_delete}>
                                    <Text>Ya</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style = {styles.button_new_invoice} onPress = {() => navigation.navigate('InvoiceForm')}>
                <Text style = {styles.text_new_invoice}>Buka Faktur Baru</Text>
            </TouchableOpacity> 
            <List>
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data = {data}
                    renderItem = {_renderItem}
                />
            </List>
        </Container>
    )
}

export default InvoiceList