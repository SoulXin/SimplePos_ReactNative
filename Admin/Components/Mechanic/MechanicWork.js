import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,TouchableOpacity,ScrollView } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {Button, ListItem, Body, Right, Text } from 'native-base';
import {handleShowModalDetail,handleComplete} from './Components/Functions/MechanicWork'
import styles from './Components/Styles/MechanicWork'
import { formatMoney } from '../../Global_Functions/Functions'
 
const MechanicWork = () => {
    const [data,setData] = useState([]);
    const [showModal_Detail,setShow_Modal_Detail] = useState(false);
    const [temp_data,setTemp_Data] = useState([]);
    const [name,setName] = useState('');
    const [date,setDate] = useState('');
    
    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/employee_work/show_employee_work",{cancelToken : source.token});
                setData(response.data);
                console.log(response.data)
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
        let temp_total = [];
        item.work_list.map((list,index) => {
            return temp_total.push(list.pay_mechanic)
        });
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);
        var net_profit = sum_total - sum_total * 0.2;
        return (
            <ListItem avatar>
                <Body>
                    <Text>{item._id}</Text>
                    <Text>Total : Rp.{formatMoney(sum_total)}</Text>
                    <Text>Bersih : Rp{formatMoney(net_profit)}</Text>
                </Body>
                <Right style = {styles.row}>
                    <Button style = {styles.button_detail} onPress = {() => handleShowModalDetail(item,setShow_Modal_Detail,setTemp_Data,setName,setDate)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    const viewDetail = () => temp_data ? temp_data.map((list,index) => {
        return (
            <View style = {styles.row_child} key = {index}>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.motorcycle_code}</Text>
                <Text style = {{flex : 2,textAlign : 'center'}}>Ganti {list.product_name}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.pay_mechanic)}</Text>
            </View>
        )
    }) : null
    
    return (
        <View  style = {styles.container}>
            <Modal visible = {showModal_Detail}>
                <View style = {styles.container_column}>
                    <View style = {{flex : 8}}>
                        <ScrollView>
                            {viewDetail()}
                        </ScrollView>
                    </View>

                    <View style = {styles.container_button}>
                        <View style = {styles.row}>
                                <View style = {{flex : 1}}>
                                    <TouchableOpacity style = {styles.button_back} onPress = {() => setShow_Modal_Detail(false)}>
                                        <Text style = {{textAlign : 'center'}}>Kembali</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style = {{flex : 1}}>
                                    <TouchableOpacity style = {styles.button_complete} onPress = {() => handleComplete(data,temp_data,name,date,setShow_Modal_Detail,setName,setData)}>
                                        <Text style = {{textAlign : 'center'}}>Selesai Pekerjaan</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data = {data}
                renderItem = {_renderItem}
                keyExtractor = {(item,index) => index.toString()}
            />
        </View>
    )
}

export default MechanicWork