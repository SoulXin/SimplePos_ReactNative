import React,{useState,useCallback,useContext} from 'react'
import { View,FlatList, ActivityIndicator,Modal,ScrollView,TouchableOpacity,TextInput, Alert} from 'react-native'
import { Container, Header,  List, Item, Button, ListItem, Body, Right, Text } from 'native-base';
import { useFocusEffect } from 'react-navigation-hooks'
import {Context} from '../../Context/Context'
import {formatRupiah,removeFormatMoney,formatMoney} from './Components/Functions'
import axios from 'axios'
import _ from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Home = ({navigation}) => {
    const {dataContext,dispatch} = useContext(Context);

    // Data
    const [data,setData] = useState([]);
    const [tempData,setTempData] = useState([]);
    const [fullData,setfullData] = useState([]);
    const [reloadData,setReloadData] = useState([]);
    const [detailProduct,setDetailProduct] = useState('');

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [nameProduct,setNameProduct] = useState('');
    const [nameMotorcycle,setNameMotorcycle] = useState('');
    const [qty,setQty] = useState(1);
    const [temp_add,setTemp_Add] = useState('');
    const [pay_mechanic,setPay_Mechanic] = useState(0);
    
    // Modal
    const [showModal,setShowModal] = useState(false);
    const [showModalQty,setShowModalQty] = useState(false);

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/product/show_product",{cancelToken : source.token});
                setData(response.data);
                setfullData(response.data);
                setReloadData(response.data);
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
            dispatch({type : 'CHANGE_VIEW',data : 'home'});
            source.cancel();
        }
    },[]));



    const handleAdd = () => {
        setShowModalQty(false);
        const data = {
            id : temp_add._id,
            product_name : temp_add.product_name,
            product_price : temp_add.product_price,
            qty : qty,
            pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
        }
        if(dataContext.invoice_detail.invoice_id){
            const data_invoice_detail = {
                bk : dataContext.invoice_detail.bk,
                worker : dataContext.invoice_detail.worker,
                product : dataContext.invoice_detail.product
            }
            
            axios({
                method : 'GET',
                url : `http://192.168.43.171:5000/invoice/detail_invoice/${dataContext.invoice_detail.invoice_id}`
            })
            .then(response => {
                let temp_dataContext =  response.data.product.filter((list,index) => {
                    return list.id !== data.id
                });
                const filter_data = _.filter(response.data.product,list => {
                    if(list.id.includes(data.id)){
                        return true
                    }
                    return false
                });
    
                if(filter_data.length){
                    const temp_filter_data = {
                        id : filter_data[0].id,
                        product_name : filter_data[0].product_name,
                        product_price : filter_data[0].product_price,
                        qty : filter_data[0].qty + qty,
                        pay_mechanic : data.pay_mechanic
                    }
                    temp_dataContext.push(temp_filter_data);
                    const data_already = {
                        bk : dataContext.invoice_detail.bk,
                        worker : dataContext.invoice_detail.worker,
                        product : temp_dataContext,
                    }
     
                    axios({
                        method : 'PUT',
                        url : `http://192.168.43.171:5000/invoice/update_invoice/${dataContext.invoice_detail.invoice_id}`,
                        data : data_already  
                    })
                    .then(response => {
                        setQty(1);
                        temp_dataContext = [];
                    })  
                    .catch(error => {
                        console.log(error);
                    })
                }else{
                    temp_dataContext.push(data);
                    const new_data = {
                        bk : dataContext.invoice_detail.bk,
                        worker : dataContext.invoice_detail.worker,
                        product : temp_dataContext,
                    }

                    axios({
                        method : 'PUT',
                        url : `http://192.168.43.171:5000/invoice/update_invoice/${dataContext.invoice_detail.invoice_id}`,
                        data : new_data  
                    })
                    .then(response => {
                        temp_dataContext = [];
                        setQty(1);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

        }else{
            const filter_data =  dataContext.temp_data_invoice.filter(list => {
                if(list.id.includes(data.id)){
                    return true
                }
                return false
            });

            if(filter_data.length){
                setQty(1);
                const filter = dataContext.temp_data_invoice.filter(list => list.id === data.id);
                const temp_data_filter = dataContext.temp_data_invoice.filter(list => list.id !== data.id);
                const data_filter = {
                    id : filter[0].id,
                    product_name : filter[0].product_name,
                    product_price : filter[0].product_price,
                    qty : filter[0].qty + data.qty,
                    pay_mechanic : data.pay_mechanic
                }
                console.log(data_filter)
                temp_data_filter.push(data_filter);                
                dispatch({type : 'ADD_TEMP_DATA_INVOICE',data : temp_data_filter});
            }else{
                setQty(1);
                Alert.alert('Pemberitahuan','Produk Berhasil Di Masukan Kedalam Bon',[{text : 'OK'}]);
                let temp_data = dataContext.temp_data_invoice;
                temp_data.push(data);
                dispatch({type : 'ADD_TEMP_DATA_INVOICE',data : temp_data});
            }
        }
    }

    const handleModalQty = (item) => {
        handleAdd(item);
    }

    const handleCloseModalQty = () => {
        setShowModalQty(false);
        setQty(1);
    }

    const handleOpenModalQty = (item) => {
        setShowModalQty(true);
        setPay_Mechanic(0);
        setTemp_Add(item);
        if(dataContext.invoice_detail.invoice_id){
            axios({
                method : 'GET',
                url : `http://192.168.43.171:5000/invoice/detail_invoice/${dataContext.invoice_detail.invoice_id}`
            })
            .then(response => {
                response.data.product.filter((list,index) => {
                    if(list.id === item._id){
                        setPay_Mechanic(formatMoney(list.pay_mechanic));
                    }
                });
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            dataContext.temp_data_invoice.filter(list => {
                if(list.id === item._id){
                    setPay_Mechanic(formatMoney(list.pay_mechanic));
                }
            });
        }
    }
    
    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar>
                <Body>
                    <Text>{item.product_name}</Text>
                    <Text note>Modal :  Rp.{formatMoney(item.product_capital)}</Text>
                    <Text note>Jual     :  Rp.{formatMoney(item.product_price)}</Text>
                </Body>
                <Right>
                    {
                        dataContext.view === "home" ?     
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5}}  onPress = {() => handleOpenModal(item)}>
                            <Text>Detail</Text>
                        </Button> : 
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5}}  onPress = {() => handleOpenModalQty(item)}>
                            <Text>Tambah</Text>
                        </Button>
                    }
                </Right>
            </ListItem>
        )
    }

    const handleOpenModal = (item) => {
        setDetailProduct(item);
        setShowModal(true);
    }

    const renderFooter = () => {
        if(!loading){
            return null 
        }
        return (
            <View style = {{paddingVertical :20,borderTopWidth : 1,borderColor : 'black'}}>
                <ActivityIndicator animating size = "large"/>
            </View>
        )
    }

    const handleSearchProduct = (text) => {
        setNameProduct(text);
        const formattedQuery = text.toLowerCase()
        const filter_data = _.filter(fullData,list => {
            if(list.product_name.toLowerCase().includes(formattedQuery)){
                return true
            }
            return false
        })
        setData(filter_data)
        setTempData(filter_data)
    }

    const handleFocus = () => {
        setNameProduct('');
        setNameMotorcycle('');
        setData(reloadData);
    }
    const handleSearchMotorcycle = (text) => {
        setNameMotorcycle(text);
        let data_filter = [];
        const formattedQuery = text.toLowerCase();
        tempData.filter((list,index) => {
            _.filter(list.product_type,list_type => {
                if(list_type.name.toLowerCase().includes(formattedQuery)){
                    data_filter.push(list);
                }
            })
        })
        setData(data_filter);;
    }

    const viewCategoryHonda = () => detailProduct ? detailProduct.product_type.map((list,index) => {
        if(list.category === "Honda"){
            return(
                <View style = {{padding : 5,margin : 2}} key = {index}>
                    <View style = {{borderWidth : 1,borderRadius : 5,padding : 5}}>
                        <Text>{list.name}</Text>
                        <Text>{list.year}</Text>
                    </View>
                </View>
            )
        }
    }) : null;

    const viewCategoryYamaha = () => detailProduct ? detailProduct.product_type.map((list,index) => {
        if(list.category === "Yamaha"){
            return(
                <View style = {{padding : 5,margin : 2}}  key = {index}>
                    <View style = {{borderWidth : 1,borderRadius : 5,padding : 5}}>
                        <Text>{list.name}</Text>
                        <Text>{list.year}</Text>
                    </View>
                </View>
            )
        }
    }) : null;
    
    const viewDetail = () => {
        return (
            <Modal visible = {showModal}>
                <View style = {{flex : 1,margin : 10,borderWidth : 1,borderRadius : 5,padding : 5,borderColor : '#61c0bf'}}>
                        <Text style = {{textAlign : 'center',fontWeight : 'bold',fontSize : 20}}>Detail Produk</Text>
                        <View style = {{marginTop : 20}}>
                            <Text style = {{fontWeight : 'bold',fontSize : 16}}>Nama Barang</Text>
                            <Text>{detailProduct.product_name}</Text>
                        </View>

                        <View style = {{marginTop : 20,flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                            <View style = {{flex : 1,marginRight : 5}}>
                                <Text style = {{fontWeight : 'bold',fontSize : 16}}>Modal</Text>
                                <Text>Rp. {formatMoney(detailProduct.product_capital)}</Text>
                            </View>
                            
                            <View style = {{flex : 1,marginLeft : 5}}>
                                <Text style = {{fontWeight : 'bold',fontSize : 16}}>Harga Jual</Text>
                                <Text>Rp. {formatMoney(detailProduct.product_price)}</Text>
                            </View>
                        </View>

                        <View style = {{marginTop : 20}}>
                            <Text style = {{fontWeight : 'bold',fontSize : 16}}>Ketersediaan Produk</Text>
                            <View style = {{flexDirection : 'row'}}>
                                <View style = {detailProduct ? {padding : 10,borderRadius : 10,backgroundColor : 'green',width : 1,margin : 5} : {padding : 10,borderRadius : 10,backgroundColor : 'red',width : 1,margin : 5}}></View>
                                <Text style = {{margin : 5}}>{detailProduct ? "Tersedia" : "Tidak Tersedia"}</Text>
                            </View>
                        </View>
                        <View style = {{marginTop : 20}}>
                            <Text style = {{fontWeight : 'bold'}}>Jenis Kereta</Text>
                            <View style = {{flexDirection : 'row'}}>
                                    <Text style = {{flex : 1,fontWeight : 'bold',textAlign : 'center'}}>Honda</Text>
                                    <Text style = {{flex : 1, fontWeight : 'bold',textAlign : 'center'}}>Yamaha</Text>
                                    <Text style = {{flex : 1, fontWeight : 'bold',textAlign : 'center'}}>Lainnya</Text>
                            </View>
                            <ScrollView>
                                <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                                    <View style = {{flex : 1,borderRightWidth : 1}}>
                                        {viewCategoryHonda()}
                                    </View>
                                    
                                    <View style = {{flex : 1,borderLeftWidth : 1}}>
                                        {viewCategoryYamaha()}
                                    </View>

                                    <View style = {{flex : 1,borderLeftWidth : 1}}>
                                        {viewCategoryYamaha()}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>


                        <TouchableOpacity style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,position : 'absolute',right : 5,top : 5}} onPress = {() => setShowModal(false)}>
                            <Text style = {{textAlign : 'center',fontSize : 14}}>Batal</Text>
                        </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    const handleBack = () => {
        if(dataContext.view === "invoice_detail"){
            dispatch({type : 'CHANGE_VIEW',data : 'home'});
            dispatch({type : 'CLEAR_INVOICE_DETAIL'});
            navigation.navigate('InvoiceDetail');
        }else{
            dispatch({type : 'CHANGE_VIEW',data : 'home'})
            navigation.navigate('InvoiceForm');
        }
    }

    const button = () => {
        if(qty == 0){
            return (
                <View>
                    <TouchableOpacity onPress = {handleCloseModalQty}  style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Batal</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity onPress = {handleAdd} style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Tambah</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <Container>
            <Modal visible = {showModalQty} transparent>
                <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                    <View style = {{padding : 50,borderRadius : 10,backgroundColor : '#e3fdfd'}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 20,marginBottom : 10}}>Masukan Jumlah Produk</Text>
                        <View style = {{flexDirection : 'row'}}>
                            <View style = {{flex : 1,justifyContent : 'center',alignItems : 'center'}}>
                                <TouchableOpacity style = {{paddingRight : 22,paddingLeft : 22,paddingTop : 9,paddingBottom : 9, borderRadius : 5,backgroundColor : '#ffb6b9'}} onPress = {() => qty > 0 ? setQty(qty - 1) : null}>
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
            {viewDetail()}
            <Header searchBar style = {{backgroundColor : '#61c0bf'}}>
                <Item style = {{borderRadius : 5,marginRight : 5}}>
                    <TextInput placeholder="Nama Produk" value = {nameProduct} onChangeText = {handleSearchProduct} onFocus = {handleFocus} returnKeyType = "next" onSubmitEditing = {() => inputMotorcycle.focus()}/>
                </Item>
                <Item style = {{borderRadius : 5,marginLeft : 5}}>
                    <TextInput placeholder="Nama Kereta" value = {nameMotorcycle} onChangeText = {handleSearchMotorcycle} returnKeyType = "done" ref = {(input) => inputMotorcycle = input}/>
                </Item>
            </Header>
            <List>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                    ListFooterComponent = {renderFooter}
                />
            </List>
            {
                dataContext.view === "home" ? 
                <Button rounded style = {{position : 'absolute',bottom : 20,left : 20,backgroundColor : '#61c0bf'}} onPress = {() => navigation.navigate('InvoiceForm')}>
                    <Text>Buka Faktur</Text>
                </Button> : 
                <Button rounded style = {{position : 'absolute',bottom : 20,left : 20,backgroundColor : '#ffb6b9'}} onPress = {handleBack}>
                    <Text>Kembali</Text>
                </Button>
            }
        </Container>
    )
}

export default Home