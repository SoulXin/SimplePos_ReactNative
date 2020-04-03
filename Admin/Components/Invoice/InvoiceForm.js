import React,{useState,useContext,useCallback} from 'react'
import {Text,TextInput,ScrollView ,Alert,Modal,TouchableOpacity,Picker , View} from 'react-native'
import moment from 'moment'
import {Context} from '../../Context/Context'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatRupiah,removeFormatMoney,formatMoney} from './Components/Functions'

const InvoiceForm = ({navigation}) => {
    const [bk,setBK] = useState('');
    const [worker,setWorker] = useState('');
    const [showModalDetail,setShowModalDetail] = useState(false);
    const [temp_detail,setTemp_Detail] = useState('');
    const {dataContext,dispatch} = useContext(Context);
    const [index,setIndex] = useState('');
    const [temp_qty,setTemp_qty] = useState(0);
    const [employee,setEmployee] = useState([]);
    const [pay_mechanic,setPay_Mechanic] = useState(0);

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/employee/show_employee",{cancelToken : source.token});
                setEmployee(response.data);

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

    const handleNavigation = () => {
        dispatch({type : 'CHANGE_VIEW',data : 'invoice'});
        navigation.navigate('Home');
    }

    const viewProductInvoice = () => dataContext.temp_data_invoice.length ? dataContext.temp_data_invoice.map((list,index) => {
        return(
            <TouchableOpacity disabled = {showModalDetail} style = {{flexDirection : 'row',alignItems : 'center',margin : 5,padding : 10,borderRadius : 5,borderWidth : 1}} key = {index} onPress = {() => handleModalDetail(list.id,index)}>
                <Text style = {{flex : 1,textAlign : 'center'}}> {list.product_name}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}> {list.qty}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.product_price)}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.qty * list.product_price + list.pay_mechanic)}</Text>
            </TouchableOpacity>
        )
    }) : null
    
    const handleModalDetail = (id,index) => {
        const filter = dataContext.temp_data_invoice.filter(list => list.id === id);
        setTemp_Detail(filter[0]);
        setPay_Mechanic(formatMoney(filter[0].pay_mechanic));
        setShowModalDetail(true);
        dataContext.temp_data_invoice.splice(index,1);
        setIndex(index);
    }

    const handleCancel = () => {
        navigation.navigate('InvoiceList');
        dispatch({type : 'CLEAR_TEMP_DATA_INVOICE'});
    }

    const handleAdd = () => {
        const data = {
            bk : bk,
            worker : worker,
            product : dataContext.temp_data_invoice
        }
        console.log(data)
        axios({
            method : 'POST',
            url : `http://192.168.43.171:5000/invoice/add_invoice`,
            data : data
        })
        .then(response => {
            dispatch({type : 'CLEAR_TEMP_DATA_INVOICE'});
            setBK('');
            setWorker('');
            Alert.alert('Pemberitahuan','Bon Berhasil Di Buat',[{text : 'OK',onPress : () => navigation.navigate('InvoiceList')}]);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleDelete = () => {
        setShowModalDetail(false);
        setTemp_qty(0);
    }

    const handleUpdate = () => {
        const temp_detail_product = {
            id : temp_detail.id,
            product_name : temp_detail.product_name,
            product_price : temp_detail.product_price,
            qty : temp_detail.qty + temp_qty,
            pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
        }
        dataContext.temp_data_invoice.splice(index,0,temp_detail_product);
        setShowModalDetail(false);
        setTemp_qty(0);
    }

    const button = () => {
        if(temp_detail.qty + temp_qty == 0){
            return (
                <View>
                    <TouchableOpacity style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}} onPress = {handleDelete}>
                        <Text>Hapus</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}} onPress = {handleUpdate}>
                        <Text>Perbarui Jumlah Produk</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const handleIncrement = () => {
        setTemp_qty(temp_qty + 1);
    }

    const handleDecrement = () => {
        if(temp_detail.qty + temp_qty > 0){
            setTemp_qty(temp_qty - 1)
        }else{
            console.log("sudah 0")
        }
    }

    const viewEmployee = () => employee ? employee.map((list,index) => {
        return (
            <Picker label = {list.name} value = {list.name} key = {index}/>
        )
    }) : null;

    return (
        <View style = {{flex : 1,margin : 10}}>
            <Modal visible = {showModalDetail} transparent>
                <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    <View style = {{padding : 50,backgroundColor : '#e3fdfd',borderRadius : 10}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10}}>Masukan Jumlah Produk</Text>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10}}>({temp_detail.product_name})</Text>
                        <View style = {{flexDirection : 'row'}}>
                            <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center',opacity : 1}}>
                                <TouchableOpacity style = {{paddingRight : 22,paddingLeft : 22,paddingTop : 9,paddingBottom : 9, borderRadius : 5,backgroundColor : '#ffb6b9'}} onPress = {handleDecrement}>
                                    <Text style = {{fontSize : 24,fontWeight : 'bold'}}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {{flex : 1}}>
                                <Text style = {{padding : 10,textAlign : 'center'}}>
                                    {temp_detail.qty + temp_qty}
                                </Text>
                            </View>
                            <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                                <TouchableOpacity style = {{paddingRight : 20,paddingLeft : 20,paddingTop : 9,paddingBottom : 9,borderRadius : 5,backgroundColor : '#61c0bf'}} onPress = {handleIncrement}>
                                    <Text style = {{fontSize : 24,fontWeight : 'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10,textAlign : 'center',marginTop : 10}}>Biaya Pemasangan</Text>
                        <View style = {{flexDirection : 'row'}}>
                            <TextInput
                                style = {{flex : 4, borderWidth : 1,borderRadius : 7,textAlign : 'center',fontSize : 20,fontWeight : 'bold',color : 'red'}}
                                value = {pay_mechanic ? pay_mechanic.toString() : 0}
                                onChangeText = {(e) => formatRupiah(e,'Rp. ',setPay_Mechanic)}
                            />

                            <TouchableOpacity style = {{flex : 1,alignItems : 'center',justifyContent : 'center',borderWidth : 1,borderRadius : 7,margin : 3 }} onPress = {() => setPay_Mechanic('0')}>
                                <Icon name = "undo" style = {{fontSize : 20}} />
                            </TouchableOpacity>
                        </View>

                        <View style = {{marginTop : 20}}>
                            {button()}
                        </View>
                    </View>
                </View>
            </Modal>

            <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center'}}>
                <View style = {{flex : 1,margin : 10}}>
                    <Text>BK Kereta</Text>
                    <TextInput 
                        placeholder = "BK Kereta"
                        style = {{borderBottomWidth : 1}}
                        returnKeyType = "next" 
                        onSubmitEditing = {() => inputWorker.focus()}
                        onChangeText = {(e) => setBK(e)}
                        value = {bk}
                    />
                </View>
                <View style = {{flex : 2,margin : 10}}>
                    <Text>Mekanik</Text>
                    <Picker 
                        selectedValue = {worker}
                        onValueChange = {(value) => setWorker(value)}
                    >
                        <Picker label = "Tidak Ada" value = "Tidak Ada"/>
                        {viewEmployee()}
                    </Picker>
                </View>
                <View style = {{flex : 1,alignItems : 'flex-start'}}>
                    <Text>{moment().format('ll')}</Text>
                </View>
            </View>

            <View style = {{flexDirection : 'row',margin : 5,padding : 10}}>
                <Text style = {{flex : 1,textAlign : 'center'}}>Nama Produk</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Jumlah</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Harga</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Total</Text>
            </View>

            <View style = {{height : 260}}>
                <ScrollView>
                    {viewProductInvoice()}
                </ScrollView>
            </View>

            <View style = {{flexDirection : 'column',width : '100%',justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>            
                <View style = {{flexDirection : 'row',flex : 1}}>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10}} onPress = {handleNavigation}>
                            <Text style = {{textAlign : 'center'}}>Tambah Produk</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10}} onPress = {handleAdd}>
                            <Text style = {{textAlign : 'center'}}>Buka Bon</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


    
        </View>
    )
}

export default InvoiceForm
