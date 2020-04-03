import React,{useState,useCallback,useContext} from 'react'
import { View, TouchableOpacity,FlatList,Modal, Alert } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const Index = () => {
    const [data,setData] = useState([]);
    const [showModalUpdate,setShowModalUpdate] = useState(false);
    const [qty,setQty] = useState(0);
    const [temp_detail,setTemp_Detail] = useState('');

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/inventory/show_inventory",{cancelToken : source.token});
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

    const handleShowModalUpdate = (item) => {
        setShowModalUpdate(true);
        setTemp_Detail(item);
        setQty(item.qty);
    }
    const handleUpdate = () => {
        setShowModalUpdate(false);
        const data_qty = {
            qty : parseInt(qty)
        }
        if(qty < temp_detail.qty){
            Alert.alert('Pemberitahuan','Jumlah Produk Tidak Boleh Lebih Kecil Dari Jumlah Sekarang',[{text : 'OK'}]);
        }else{
            axios({
                method : 'PUT',
                url : `http://192.168.43.171:5000/inventory/update_inventory/${temp_detail._id}`,
                data : data_qty
            })
            .then(response => {
                if(qty > 2){
                    const temp_data = data.filter(list => list._id !== temp_detail._id);
                    setData(temp_data);
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const _renderItem = ({item,index }) => {
        return (
            <ListItem thumbnail>
                <Body>
                    <Text>{item.product_name}</Text>
                    <Text note>Stok : {item.qty}</Text>
                </Body>
                <Right>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,marginTop : 8}} onPress = {() => handleShowModalUpdate(item)}>
                        <Text>Update</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <View>
            {/* Modal Update */}
            <Modal visible = {showModalUpdate} transparent>
                <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    <View style = {{padding : 50,borderRadius : 10,backgroundColor : '#e3fdfd'}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10}}>Masukan Jumlah Produk</Text>
                        <View style = {{flexDirection : 'row'}}>
                            <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                                <TouchableOpacity style = {{paddingRight : 22,paddingLeft : 22,paddingTop : 9,paddingBottom : 9, borderRadius : 5,backgroundColor : '#ffb6b9'}} onPress = {() => qty > 1 ? setQty(qty - 1) : null}>
                                    <Text style = {{fontSize : 24,fontWeight : 'bold'}}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{flex : 1}}>
                                <Text style = {{padding : 10,textAlign : 'center'}}>
                                    {qty}
                                </Text>
                            </View>
                            <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                                <TouchableOpacity style = {{paddingRight : 20,paddingLeft : 20,paddingTop : 9,paddingBottom : 9,borderRadius : 5,backgroundColor : '#61c0bf'}} onPress = {() => setQty(qty + 1)}>
                                    <Text style = {{fontSize : 24,fontWeight : 'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style = {{marginTop : 20,flexDirection : 'row'}}>
                            <View style = {{flex : 1,margin : 2}}>
                                <TouchableOpacity style = {{padding : 10,borderRadius : 7,backgroundColor : '#ffb6b9'}} onPress = {() => setShowModalUpdate(false)}>
                                    <Text style = {{fontSize : 14,textAlign : 'center'}}>Batal</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {{flex : 1,margin : 2}}>
                                <TouchableOpacity  style = {{padding : 10,borderRadius : 7,backgroundColor : '#61c0bf'}} onPress = {handleUpdate}>
                                    <Text style = {{fontSize : 14,textAlign : 'center'}}>Perbarui</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <List>
                <FlatList
                    keyExtractor={(item, index) => item._id}
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </List>
        </View>
    )
}

export default Index