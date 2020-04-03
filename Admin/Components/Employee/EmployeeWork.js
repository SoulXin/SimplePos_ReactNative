import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,TouchableOpacity,ScrollView,TextInput,Picker } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const EmployeeWork = () => {
    const [data,setData] = useState([]);
    const [showModal_Detail,setShow_Modal_Detail] = useState(false);
    const [temp_data,setTemp_Data] = useState([]);
    // const [total_payment,setTotal_Payment] = useState('');

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/employee_work/show_employee_work",{cancelToken : source.token});
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


    const handleShowModalDetail = (item) => {
        setShow_Modal_Detail(true);
        setTemp_Data(item);
    }
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
                <Right style = {{flexDirection : 'row'}}>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,margin : 2}} onPress = {() => handleShowModalDetail(item.work_list)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }
    const viewDetail = () => temp_data ? temp_data.map((list,index) => {
        return (
            <View style = {{flexDirection : 'row',borderWidth : 1,borderRadius : 7,padding : 10,margin : 5}}>
                <Text style = {{flex : 1,textAlign : 'center'}}>{list.motorcycle_code}</Text>
                <Text style = {{flex : 2,textAlign : 'center'}}>Ganti {list.product_name}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.pay_mechanic)}</Text>
            </View>
        )
    }) : null

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

    return (
        <View  style = {{flex : 1,margin : 10}}>
            <Modal visible = {showModal_Detail}>
                {viewDetail()}
            <View style = {{width : '100%',justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                <View style = {{flexDirection : 'row'}}>
                        <View style = {{flex : 1}}>
                            <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10}} onPress = {() => setShow_Modal_Detail(false)}>
                                <Text style = {{textAlign : 'center'}}>Kembali</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flex : 1}}>
                            <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10}}>
                                <Text style = {{textAlign : 'center'}}>Selesai Pekerjaan</Text>
                            </TouchableOpacity>
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

export default EmployeeWork
