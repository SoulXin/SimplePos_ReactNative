import React,{useState,useCallback} from 'react'
import { View, TouchableOpacity,FlatList,Modal,SafeAreaView } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import {  Button, ListItem, Body, Right,Text } from 'native-base';
import {handleShowModalUpdate,handleUpdate} from './Components/Functions'
import styles from './Components/Styles'
import { checkUserSignedIn, clear_AsyncStorage } from '../../Global_Functions/Functions'
import Loading from '../Modal_Loading/Loading'

const Index = ({navigaiton}) => {
    const [data,setData] = useState([]);
    const [showModalUpdate,setShowModalUpdate] = useState(false);
    const [qty,setQty] = useState(0);
    const [temp_detail,setTemp_Detail] = useState('');
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigaiton)
        .then(res => {
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/inventory/show_inventory/${res.user._id}`,{cancelToken : source.token});
                    setData(response.data);
                    setLoading(false);
                }catch (error) {
                    setLoading(false);
                    if(axios.isCancel(error)){
                        console.log("Response has been cancel TableList")
                    }else{
                        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
                    }
                }
            };
            loadData();
        })
        .catch(err => {
            setLoading(false);
            clear_AsyncStorage(navigaiton);
        })
        return () => {
            source.cancel();
            setData([]);
        }
    },[]));

    const _renderItem = ({item,index }) => {
        return (
            <ListItem thumbnail>
                <Body>
                    <Text>{item.product_name}</Text>
                    <Text note>Stok : {item.qty}</Text>
                </Body>
                <Right>
                    <Button style = {styles.button_update} onPress = {() => handleShowModalUpdate(item,setShowModalUpdate,setTemp_Detail,setQty)}>
                        <Text>Update</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <View>
            <Loading loading = {loading}/>
            {/* Modal Update */}
            <Modal visible = {showModalUpdate} transparent>
                <View style = {styles.container_modal}>
                    <View style = {styles.container_box_modal}>
                        <Text style = {styles.title}>Masukan Jumlah Produk</Text>
                        <View style = {styles.row}>
                            <View style = {styles.container_button}>
                                <TouchableOpacity style = {styles.button_decrement} onPress = {() => qty > 1 ? setQty(qty - 1) : null}>
                                    <Text style = {styles.button_text}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{flex : 1}}>
                                <Text style = {styles.text_qty}>
                                    {qty}
                                </Text>
                            </View>
                            <View style = {styles.container_button}>
                                <TouchableOpacity style = {styles.button_increment} onPress = {() => setQty(qty + 1)}>
                                    <Text style = {styles.button_text}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style = {styles.row_bottom}>
                            <View style = {styles.cell_row_bottom}>
                                <TouchableOpacity style = {styles.button_cancel} onPress = {() => setShowModalUpdate(false)}>
                                    <Text style = {styles.button_text}>Batal</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.cell_row_bottom}>
                                <TouchableOpacity  style = {styles.button_refresh} onPress = {() => handleUpdate(qty,temp_detail,data,setShowModalUpdate,setData,setLoading)}>
                                    <Text style = {styles.button_text}>Perbarui</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <SafeAreaView>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </SafeAreaView>
        </View>
    )
}

export default Index