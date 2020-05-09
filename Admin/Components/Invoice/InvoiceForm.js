import React,{useState,useContext,useCallback} from 'react'
import {Text,TextInput,ScrollView ,Alert,Modal,TouchableOpacity,Picker , View} from 'react-native'
import moment from 'moment'
import {Context} from '../../Context/Context'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatRupiah,formatMoney, checkUserSignedIn,clear_AsyncStorage} from '../../Global_Functions/Functions'
import {
    handleNavigation,
    handleModalDetail,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleIncrement,
    handleDecrement
} from './Components/Functions/InvoiceForm'
import styles from './Components/Styles/InvoiceForm'
import Loading from '../Modal_Loading/Loading'

const InvoiceForm = ({navigation}) => {
    const [user_Id,setUser_Id] = useState('');
    const [bk,setBK] = useState('');
    const [mechanic,setMechanic] = useState('');
    const [showModalDetail,setShow_Modal_Detail] = useState(false);
    const [temp_detail,setTemp_Detail] = useState('');
    const {dataContext,dispatch} = useContext(Context);
    const [index,setIndex] = useState('');
    const [temp_qty,setTemp_qty] = useState(0);
    const [employee,setEmployee] = useState([]);
    const [pay_mechanic,setPay_Mechanic] = useState(0);
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            setUser_Id(res.user._id);
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/employee/show_employee/${res.user._id}`,{cancelToken : source.token});
                    setEmployee(response.data);
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
            clear_AsyncStorage(navigation);
        })
        return () => {
            dispatch({type : 'CLEAR_TEMP_DATA_INVOICE'});
            source.cancel();
            setEmployee([]);
        }
    },[]));

    const viewProductInvoice = () => dataContext.temp_data_invoice.length ? dataContext.temp_data_invoice.map((list,index) => {
        return(
            <TouchableOpacity disabled = {showModalDetail} style = {index % 2 == 0 ? styles.table_child_row_1 : styles.table_child_row_2} key = {index} onPress = {() => handleModalDetail(list.id,index,dataContext,setTemp_Detail,setPay_Mechanic,setShow_Modal_Detail,setIndex)}>
                <Text style = {styles.table_name_cell}> {list.product_name}</Text>
                <Text style = {styles.table_name_cell}> {list.qty}</Text>
                <Text style = {styles.table_name_cell}>Rp. {formatMoney(list.product_price)}</Text>
                <Text style = {styles.table_name_cell}>Rp. {formatMoney(list.qty * list.product_price + list.pay_mechanic)}</Text>
            </TouchableOpacity>
        )
    }) : null
    
    const button = () => {
        if(temp_detail.qty + temp_qty == 0){
            return (
                <View>
                    <TouchableOpacity style = {styles.button_delete_product} onPress = {() => handleDelete(setShow_Modal_Detail,setTemp_qty)}>
                        <Text>Hapus</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity style = {styles.button_refresh_product} onPress = {() => handleUpdate(temp_detail,temp_qty,pay_mechanic,dataContext,index,setShow_Modal_Detail,setTemp_qty)}>
                        <Text>Perbarui Jumlah Produk</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const viewEmployee = () => employee ? employee.map((list,index) => {
        return (
            <Picker label = {list.name} value = {list.name} key = {index}/>
        )
    }) : null;

    return (
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <Modal visible = {showModalDetail} transparent>
                <View style = {styles.container_modal_detail}>
                    <View style = {styles.container_box_modal_detail}>
                        <Text style = {styles.title_text_modal_detail}>Masukan Jumlah Produk</Text>
                        <Text style = {styles.title_text_modal_detail}>({temp_detail.product_name})</Text>
                        <View style = {styles.row}>
                            <View style = {styles.button_decrement}>
                                <TouchableOpacity style = {styles.container_button_decrement} onPress = {() => handleDecrement(temp_detail,temp_qty,setTemp_qty)}>
                                    <Text style = {styles.button_text}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{flex : 1}}>
                                <Text style = {styles.qty_text}>
                                    {temp_detail.qty + temp_qty}
                                </Text>
                            </View>
                            <View style = {styles.button_increment}>
                                <TouchableOpacity style = {styles.container_button_increment} onPress = {() => handleIncrement(setTemp_qty,temp_qty)}>
                                    <Text style = {styles.button_text}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style = {styles.title_second_option}>Biaya Pemasangan</Text>
                        <View style = {styles.row}>
                            <TextInput
                                style = {styles.text_input_pay_mechanic}
                                value = {pay_mechanic ? pay_mechanic.toString() : ""}
                                onChangeText = {(e) => formatRupiah(e,'Rp. ',setPay_Mechanic)}
                                onFocus = {() => setPay_Mechanic("")}
                            />

                            <TouchableOpacity style = {styles.button_reset_pay_mechanic} onPress = {() => setPay_Mechanic("")}>
                                <Icon name = "undo" style = {{fontSize : 20}} />
                            </TouchableOpacity>
                        </View>

                        <View style = {{marginTop : 20}}>
                            {button()}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View style = {styles.container_header_invoice}>
                <View style = {styles.container_motorcycle_code}>
                    <Text>BK Kereta</Text>
                    <TextInput 
                        placeholder = "BK Kereta"
                        style = {{borderBottomWidth : 1}}
                        onChangeText = {(e) => setBK(e)}
                        value = {bk}
                    />
                </View>
                <View style = {styles.container_mechanic}>
                    <Text>Mekanik</Text>
                    <Picker 
                        selectedValue = {mechanic}
                        onValueChange = {(value) => setMechanic(value)}
                    >
                        <Picker label = "Kosong" value = "Kosong"/>
                        <Picker label = "Bawa Pulang" value = "Bawa Pulang"/>
                        {viewEmployee()}
                    </Picker>
                </View>
                <View style = {styles.container_date}>
                    <Text>{moment().format('ll')}</Text>
                </View>
            </View>

            {/* Table Header */}
            <View style = {styles.container_table_header}>
                <Text style = {styles.table_name_cell}>Nama Produk</Text>
                <Text style = {styles.table_name_cell}>Jumlah</Text>
                <Text style = {styles.table_name_cell}>Harga</Text>
                <Text style = {styles.table_name_cell}>Total</Text>
            </View>

            {/* List */}
            <View style = {{flex : 6}}>
                <ScrollView>
                    {viewProductInvoice()}
                </ScrollView>
            </View>

            {/* Button */}
            <View style = {styles.container_bottom_header}>            
                <View style = {styles.row}>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {styles.button_add_product} onPress = {() => handleNavigation(dispatch,navigation)}>
                            <Text style = {{textAlign : 'center'}}>Tambah Produk</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {styles.button_add_invoice} onPress = {() => handleAdd(user_Id,bk,mechanic,dataContext,dispatch,setBK,setMechanic,navigation,Alert,setLoading)}>
                            <Text style = {{textAlign : 'center'}}>Buka Bon</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default InvoiceForm