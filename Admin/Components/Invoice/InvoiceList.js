import React,{useState,useCallback,useContext} from 'react'
import { View,FlatList,Modal,TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail,Text } from 'native-base';
import {formatMoney} from './Components/Functions'
const InvoiceList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [temp_id,setTemp_Id] = useState('');
    const [temp_bk,setTemp_Bk] = useState('');
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
    const handleShowModalDelete = (id,bk) => {
        setShowModalDelete(true);
        setTemp_Id(id);
        setTemp_Bk(bk);
    }

    const handleDelete = () => {
        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/invoice/delete_invoice/${temp_id}`
        })
        .then(response => {
            setShowModalDelete(false);
            const temp_data = data.filter(list => list._id !== temp_id);
            setData(temp_data);
        })
        .catch(error => {
            console.log(error)
        })
    }
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
            product : item.product,
            worker : item.worker,
            bk : item.bk,
            date_order : item.date_order,
            invoice_id : item._id
        }
    
        return (
            <ListItem avatar>
                <Body>
                    <Text>{item.bk}</Text>
                    <Text>Rp. {formatMoney(sum_total + sum_total_pay_mechanic)}</Text>
                    <Text note>Mekanik : {item.worker}</Text>
                </Body>
                <Right>
                    <View style = {{flexDirection : 'row'}}>
                        <Button style = {{backgroundColor : '#ffb6b9',borderRadius : 5,marginTop : 8,marginRight : 5}}  onPress = {() => handleShowModalDelete(item._id,item.bk)}>
                            <Text>Hapus</Text>
                        </Button>
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,marginTop : 8,marginLeft : 5}}  onPress = {() => navigation.navigate('InvoiceDetail',data)}>
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
                <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    <View style = {{padding : 50,backgroundColor : '#e3fdfd',borderRadius : 10}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10,textAlign : 'center'}}>Hapus Tagihan Ini ?</Text>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10,textAlign : 'center'}}>{temp_bk}</Text>
                        <View style = {{flexDirection : 'row',marginTop : 20}}>
                            <View style = {{flex : 1}}>
                                <TouchableOpacity onPress = {() => setShowModalDelete(false)} style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                                    <Text>Tutup</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {{flex : 1}}>
                                <TouchableOpacity onPress = {handleDelete} style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                                    <Text>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style = {{padding : 10,borderRadius : 7,margin : 10,backgroundColor : '#61c0bf'}} onPress = {() => navigation.navigate('InvoiceForm')}>
                <Text style = {{fontSize : 20,fontWeight : 'bold',textAlign : 'center'}}>Buka Faktur Baru</Text>
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
