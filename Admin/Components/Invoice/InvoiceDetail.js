import React,{useState,useCallback,useContext} from 'react'
import { View, Text,ScrollView,TouchableOpacity,Modal,TextInput } from 'react-native'
import axios from 'axios'
import {Context} from '../../Context/Context'
import { useFocusEffect } from 'react-navigation-hooks'
import {formatRupiah,removeFormatMoney,formatMoney} from './Components/Functions'
import Icon from 'react-native-vector-icons/FontAwesome5';

const InvoiceDetail = ({navigation}) => {
    const {bk,date_order,product,worker,invoice_id} = navigation.state.params;
    const [showModalDetail,setShowModalDetail] = useState(false);
    const [temp_detail,setTemp_Detail] = useState('');
    const [temp_qty,setTemp_qty] = useState(0);
    const [temp_worker,setTempWorker] = useState('');
    const [index,setIndex] = useState('');
    const [total,setTotal] = useState(0);
    const {dataContext,dispatch} = useContext(Context);
    const [productA,setProductA] = useState([]);
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
                setProductA(response.data.product);

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

    function date(){
        var text_month = ["Januari","Februari","Maret","April","Mei","Juni","July","Agustust","September","Oktober","November","Desember"];
        let day = date_order.slice(8,10);
        let month = date_order.slice(5,7);
        month = month.replace( /0/g, "");
        let year = date_order.slice(0,4);
        let monthNow = text_month[month - 1];

        return day + " " + monthNow + " " + year
    }



    const handleModalDetail = (id,index) => {
        var filtered = productA.filter(list => {return list.id === id});
        setPay_Mechanic(formatMoney(filtered[0].pay_mechanic));
        setTemp_Detail(filtered[0]);
        setShowModalDetail(true);
        productA.splice(index,1);
        setIndex(index);
    }

    const handleUpdate = () => {
        const temp_detail_product = {
            id : temp_detail.id,
            product_name : temp_detail.product_name,
            product_price : temp_detail.product_price,
            qty : temp_detail.qty + temp_qty,
            pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
        }
        const data = {
            bk : bk,
            worker : temp_worker ? temp_worker : worker,
            product : productA
        }
        const data_work_list = {
            id : temp_detail.id,
            motorcycle_code : bk,
            product_name : temp_detail.product_name,
            pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
        }

        work_list.splice(index,1);
        productA.splice(index,0,temp_detail_product);
        work_list.splice(index,0,data_work_list);

        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/invoice/update_invoice/${invoice_id}`,
            data : data
        })
        .then(response => {
            var  temp_total = [];
            var temp_total_pay_mechanic = [];

            // Total Bill
            productA.map(list => {
                return temp_total.push(list.product_price * list.qty);
            })
            var sum_total = temp_total.reduce(function(a, b){
                return a + b;
            }, 0);

            // Total Pay Mechanic
            productA.map(list => {
                return temp_total_pay_mechanic.push(list.pay_mechanic);
            })
            var sum_total_pay_mechanic = temp_total_pay_mechanic.reduce(function(a, b){
                return a + b;
            }, 0);

            setShowModalDetail(false);
            setTotal(sum_total);
            setTotal_Pay_Mechanic(sum_total_pay_mechanic);
            setTemp_Detail('');
            setTemp_qty(0);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleDelete = () => {
        productA.filter(list => list.id !== temp_detail.id);
        
        const data = {
            bk : bk,
            worker : temp_worker ? temp_worker : worker,
            product : productA
        }
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/invoice/update_invoice/${invoice_id}`,
            data : data
        })
        .then(response => {
            var  temp_total = [];
            productA.map(list => {
                return temp_total.push(list.product_price * list.qty);
            })
            var sum_total = temp_total.reduce(function(a, b){
                return a + b;
            }, 0);
            
            setShowModalDetail(false);
            setTotal(sum_total);
            setTemp_Detail('');
            setTemp_qty(0);
        })
        .catch(error => {
            console.log(error)
        })
    }
    const viewProductInvoice = () => productA.map((list,index) => {
        return(
            <TouchableOpacity disabled = {showModalDetail} style = {{flexDirection : 'row',alignItems : 'center',margin : 5,padding : 10,borderRadius : 5,borderWidth : 1}} key = {index} onPress = {() => handleModalDetail(list.id,index)}>
                <Text style = {{flex : 1,textAlign : 'center'}}> {list.product_name}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}> {list.qty}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.product_price)}</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Rp. {formatMoney(list.qty * list.product_price + list.pay_mechanic)}</Text>
            </TouchableOpacity>
        )
    });

    const handleDecrement = () => {
        if(temp_detail.qty + temp_qty > 0){
            setTemp_qty(temp_qty - 1)
        }else{
            console.log("sudah 0")
        }
    }

    const handleIncrement = () => {
        setTemp_qty(temp_qty + 1)
    }

    const handleAddProduct = () => {
        const data = {
            invoice_id : invoice_id,
            bk : bk,
            worker : worker,
            product : product
        }
        dispatch({type : 'INVOICE_DETAIL',data : data});
        dispatch({type : 'CHANGE_VIEW',data : 'invoice_detail'});
        navigation.navigate('Home');
    }

    const button = () => {
        if(temp_detail.qty + temp_qty == 0){
            return (
                <View>
                    <TouchableOpacity onPress = {handleDelete}  style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Hapus</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity onPress = {handleUpdate} style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Perbarui Jumlah Produk</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const handleComplete = () => {
        const data_invoice = {
            bk : bk,
            mechanic : worker,
            product : product,
            total : total
        }
        
        const data = {
            date_order : date_order.substring(0,10),
            order : data_invoice
        }

        const data_employee = {
            name : worker,
            work_list : work_list
        }

        console.log(data.order)
        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/invoice/delete_invoice/${invoice_id}`
        })
        .then(response => {
            axios({
                method : 'POST',
                url : 'http://192.168.43.171:5000/sales/add_sales',
                data : data
            })
            .then(response => {
                axios({
                    method : 'POST',
                    url : 'http://192.168.43.171:5000/employee_work/add_employee_work',
                    data : data_employee
                })
                .then(response => {
                    navigation.navigate('InvoiceList');
                })
                .catch(error => {
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error);
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

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
                                style = {{flex : 4, borderWidth : 1,borderRadius : 7,textAlign : 'center',fontSize : 20,fontWeight : 'bold',color : 'red',margin : 3}}
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
            <View style = {{flexDirection : 'row'}}>
                <View style = {{flex : 2}}>
                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 1}}>BK</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>{bk}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 1}}>Mekanik</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>{worker}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 1}}>Total</Text>
                        <Text style = {{flex : 0}}> : </Text>
                        <Text style = {{flex : 2}}>Rp. {formatMoney(total + total_pay_mechanic)}</Text>
                    </View>
                </View>

                <View style = {{flex : 1,alignItems : 'flex-end'}}>
                    <Text>{date()}</Text>
                </View>
            </View>
        
            <View style = {{flexDirection : 'row',margin : 5,padding : 10}}>
                <Text style = {{flex : 1,textAlign : 'center'}}>Nama Produk</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Jumlah</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Harga</Text>
                <Text style = {{flex : 1,textAlign : 'center'}}>Total</Text>
            </View>
            <View style = {{height : 290}}>
                <ScrollView>
                        {viewProductInvoice()}
                </ScrollView>
            </View>

            <View style = {{position : 'absolute',bottom : 0,width : '100%'}}>
                <View style = {{flex : 1,width : '100%'}}>
                    <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10,alignItems : 'center'}} onPress = {handleAddProduct}>
                        <Text style = {{fontSize : 14}}>Tambah Produk</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flexDirection : 'row'}}>
                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {{backgroundColor : '#ffb6b9',padding : 10,margin : 10,borderRadius : 10}} onPress = {() => navigation.navigate('InvoiceList')}>
                            <Text style = {{textAlign : 'center'}}>Kembali</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flex : 1}}>
                        <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,borderRadius : 10}} onPress = {handleComplete}>
                            <Text style = {{textAlign : 'center'}}>Selesai</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default InvoiceDetail