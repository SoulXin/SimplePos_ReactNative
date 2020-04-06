import React,{useState,useCallback,useContext} from 'react'
import { View, Text,ScrollView,TouchableOpacity,Modal,TextInput } from 'react-native'
import axios from 'axios'
import {Context} from '../../Context/Context'
import { useFocusEffect } from 'react-navigation-hooks'
import {
    formatRupiah,
    formatMoney,
    date
} from '../../Global_Functions/Functions'
import {
    handleModalDetail,
    handleUpdate,
    handleDeleteProduct,
    handleDecrement,
    handleIncrement,
    handleAddProduct,
    handleComplete
} from './Components/Functions/InvoiceDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Components/Styles/InvoiceDetail'

const InvoiceDetail = ({navigation}) => {
    const {bk,date_order,mechanic,invoice_id} = navigation.state.params;
    const [showModalDetail,setShow_Modal_Detail] = useState(false);
    const [temp_detail,setTemp_Detail] = useState('');
    const [temp_qty,setTemp_qty] = useState(0);
    const [temp_Mechanic,setTemp_Mechanic] = useState('');
    const [index,setIndex] = useState('');
    const [total,setTotal] = useState(0);
    const {dataContext,dispatch} = useContext(Context);
    const [data_Product,setData_Product] = useState([]);
    const [pay_mechanic,setPay_Mechanic] = useState(0);
    const [total_pay_mechanic,setTotal_Pay_Mechanic] = useState(0);
    const [work_list,setWork_List] = useState([]);

    useFocusEffect(useCallback(() => {
        let temp_total = [];
        let temp_total_pay_mechanic = [];
        let temp_work_list = [];

        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get(`http://192.168.43.171:5000/invoice/detail_invoice/${invoice_id}`,{cancelToken : source.token});
                setData_Product(response.data.product);

                response.data.product.map(list => {
                    const data_work_list = {
                        id : list.id,
                        motorcycle_code : response.data.bk,
                        product_name : list.product_name,
                        pay_mechanic : list.pay_mechanic
                    }
                    temp_work_list.push(data_work_list);
                });
                setWork_List(temp_work_list);

                // Total
                response.data.product.map((list,index) => {
                    return temp_total.push(list.product_price * list.qty)
                });
                var sum_total = temp_total.reduce(function(a, b){
                    return a + b;
                }, 0);
                // Mechanic
                response.data.product.map((list,index) => {
                    return temp_total_pay_mechanic.push(list.pay_mechanic)
                });
                var sum_total_pay_mechanic = temp_total_pay_mechanic.reduce(function(a, b){
                    return a + b;
                }, 0);

                setTotal(sum_total);
                setTotal_Pay_Mechanic(sum_total_pay_mechanic);
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
            temp_total = [];
        }
    },[]));

    const viewProductInvoice = () => data_Product.map((list,index) => {
        return(
            <TouchableOpacity disabled = {showModalDetail} style = {styles.row_child} key = {index} onPress = {() => handleModalDetail(list.id,index,data_Product,setPay_Mechanic,setTemp_Detail,setShow_Modal_Detail,setIndex)}>
                <Text style = {styles.title_table_cell}> {list.product_name}</Text>
                <Text style = {styles.title_table_cell}> {list.qty}</Text>
                <Text style = {styles.title_table_cell}>Rp. {formatMoney(list.product_price)}</Text>
                <Text style = {styles.title_table_cell}>Rp. {formatMoney(list.qty * list.product_price + list.pay_mechanic)}</Text>
            </TouchableOpacity>
        )
    });

    const button = () => {
        if(temp_detail.qty + temp_qty == 0){
            return (
                <View>
                    <TouchableOpacity onPress = {() => handleDeleteProduct(data_Product,temp_detail,bk,temp_Mechanic,mechanic,invoice_id,setShow_Modal_Detail,setTotal,setTemp_Detail,setTemp_qty)}  style = {styles.button_delete_product}>
                        <Text>Hapus</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity onPress = {() => handleUpdate(index,invoice_id,temp_detail,temp_qty,pay_mechanic,bk,temp_Mechanic,mechanic,data_Product,work_list,setShow_Modal_Detail,setTotal,setTotal_Pay_Mechanic,setTemp_Detail,setTemp_qty)} style = {styles.button_refresh_product}>
                        <Text>Perbarui Jumlah Produk</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style = {styles.container}>
            <Modal visible = {showModalDetail} transparent>
                <View style = {styles.container_modal_detail}>
                    <View style = {styles.container_box_modal_detail}>
                        <Text style = {styles.title_text_modal}>Masukan Jumlah Produk</Text>
                        <Text style = {styles.title_text_modal}>({temp_detail.product_name})</Text>
                        <View style = {styles.row}>
                            <View style = {styles.container_button_decrement}>
                                <TouchableOpacity style = {styles.container_box_button_decrement} onPress = {() => handleDecrement(temp_detail,temp_qty,setTemp_qty)}>
                                    <Text style = {styles.button_text}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{flex : 1}}>
                                <Text style = {styles.qty_text}>
                                    {temp_detail.qty + temp_qty}
                                </Text>
                            </View>
                            <View style = {styles.container_button_increment}>
                                <TouchableOpacity style = {styles.container_box_button_increment} onPress = {() => handleIncrement(temp_qty,setTemp_qty)}>
                                    <Text style = {styles.button_text}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style = {styles.second_title_text_modal}>Biaya Pemasangan</Text>
                        <View style = {styles.row}>
                            <TextInput
                                style = {styles.text_input_pay_mechanic}
                                value = {pay_mechanic ? pay_mechanic.toString() : '0'}
                                onChangeText = {(e) => formatRupiah(e,'Rp. ',setPay_Mechanic)}
                            />
                
                        <TouchableOpacity style = {styles.button_reset_pay_mechanic} onPress = {() => setPay_Mechanic('0')}>
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
            <View style = {styles.row}>
                <View style = {{flex : 2}}>
                    <View style = {styles.row}>
                        <Text style = {{flex : 1}}>BK</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>{bk}</Text>
                    </View>

                    <View style = {styles.row}>
                        <Text style = {{flex : 1}}>Mekanik</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>{mechanic}</Text>
                    </View>

                    <View style = {styles.row}>
                        <Text style = {{flex : 1}}>Total</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>Rp. {formatMoney(total + total_pay_mechanic)}</Text>
                    </View>
                </View>

                <View style = {styles.data}>
                    <Text>{date(date_order)}</Text>
                </View>
            </View>
                
            {/* Table Header */}
            <View style = {styles.title_table_header}>
                <Text style = {styles.title_table_cell}>Nama Produk</Text>
                <Text style = {styles.title_table_cell}>Jumlah</Text>
                <Text style = {styles.title_table_cell}>Harga</Text>
                <Text style = {styles.title_table_cell}>Total</Text>
            </View>

            {/* List */}
            <View style = {{flex : 7}}>
                <ScrollView>
                        {viewProductInvoice()}
                </ScrollView>
            </View>

            {/* Button */}
            <View style = {styles.container_button_invoice}>
                <View style = {styles.row}>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {styles.button_add_product} onPress = {() => handleAddProduct(invoice_id,bk,mechanic,data_Product,dispatch,navigation)}>
                            <Text style = {{textAlign : 'center'}}>Tambah Produk</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {styles.button_complete} onPress = {() => handleComplete(bk,mechanic,data_Product,total,date_order,work_list,invoice_id,navigation)}>
                            <Text style = {{textAlign : 'center'}}>Selesai</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default InvoiceDetail