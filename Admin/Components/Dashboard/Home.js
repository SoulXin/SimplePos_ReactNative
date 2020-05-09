import React,{useState,useCallback,useContext} from 'react'
import { View,FlatList, ActivityIndicator,Modal,ScrollView,TouchableOpacity,TextInput,SafeAreaView} from 'react-native'
import { Container, Header,  Item, Button, ListItem, Body, Right, Text } from 'native-base';
import { useFocusEffect } from 'react-navigation-hooks'
import {Context} from '../../Context/Context'
import {
    handleCloseModalQty,
    handleOpenModalQty,
    handleOpenModal,
    handleSearchProduct,
    handleFocus,
    handleSearchMotorcycle,
    handleBack,
    handleAdd
} from './Components/Functions'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './Components/Styles'
import {formatRupiah,formatMoney, checkUserSignedIn,clear_AsyncStorage} from '../../Global_Functions/Functions'
import Loading from '../Modal_Loading/Loading'

const Home = ({navigation}) => {
    const {dataContext,dispatch} = useContext(Context);
    
    // Data
    const [data,setData] = useState([]);
    const [tempData,setTempData] = useState([]);
    const [fullData,setfullData] = useState([]);
    const [reloadData,setReloadData] = useState([]);

    // Temporary Data
    const [detailProduct,setDetailProduct] = useState('');
    const [temp_add,setTemp_Add] = useState('');

    // On Change
    const [nameProduct,setNameProduct] = useState('');
    const [nameMotorcycle,setNameMotorcycle] = useState('');
    const [qty,setQty] = useState(1);
    const [pay_mechanic,setPay_Mechanic] = useState(0);

    // Notification
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    
    // Modal
    const [showModal,setShowModal] = useState(false);
    const [showModalQty,setShowModalQty] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/product/show_product/${res.user._id}`,{cancelToken : source.token});
                    setData(response.data);
                    setfullData(response.data);
                    setReloadData(response.data);
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
            setData([]);
            setfullData([]);
            setReloadData([]);
            dispatch({type : 'CHANGE_VIEW',data : 'home'});
            source.cancel();
        }
    },[]));
    
    const _renderItem = ({item,index }) => {
        return (
            <ListItem avatar key = {index}>
                <Body>
                    <Text>{item.product_name}</Text>
                    <Text note>Modal :  Rp.{formatMoney(item.product_capital)}</Text>
                    <Text note>Jual     :  Rp.{formatMoney(item.product_price)}</Text>
                </Body>
                <Right>
                    {
                        dataContext.view === "home" ?     
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5}}  onPress = {() => handleOpenModal(item,setDetailProduct,setShowModal)}>
                            <Text>Detail</Text>
                        </Button> : 
                        <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5}}  onPress = {() => handleOpenModalQty(dataContext,item,setShowModalQty,setPay_Mechanic,setTemp_Add)}>
                            <Text>Tambah</Text>
                        </Button>
                    }
                </Right>
            </ListItem>
        )
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

    const button = () => {
        if(qty == 0){
            return (
                <View>
                    <TouchableOpacity onPress = {() => handleCloseModalQty(setShowModalQty,setQty)}  style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Batal</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View>
                    <TouchableOpacity onPress = {() => handleAdd(temp_add,qty,pay_mechanic,dataContext,dispatch,setShowModalQty,setQty)} style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 5,alignItems : 'center',margin : 2}}>
                        <Text>Tambah</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <Container>
            <Loading loading = {loading}/>
            <Modal visible = {showModalQty} transparent>
                <View style = {styles.container_add_new_product}>
                    <View style = {styles.container_box_add_new_product}>
                        <Text style = {styles.main_title_modal}>Masukan Jumlah Produk</Text>
                        <View style = {styles.row}>
                            <View style = {styles.cell}>
                                <TouchableOpacity style = {styles.decrement_qty_button} onPress = {() => qty > 0 ? setQty(qty - 1) : null}>
                                    <Text style = {styles.button_text}>-</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.cell}>
                                <Text style = {styles.qty_text}>
                                    {qty}
                                </Text>
                            </View>
                            <View style = {styles.cell}>
                                <TouchableOpacity style = {styles.increment_qty_button} onPress = {() => setQty(qty + 1)}>
                                    <Text style = {styles.button_text}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style = {styles.main_title_modal}>Biaya Pemasangan</Text>
                        <View style = {styles.row}>
                            <TextInput
                                style = {styles.input_pay_mechanic}
                                value = {pay_mechanic ? pay_mechanic.toString() : ""}
                                onChangeText = {(e) => formatRupiah(e,'Rp. ',setPay_Mechanic)}
                                onFocus = {() => setPay_Mechanic("")}
                            />
                            <TouchableOpacity style = {styles.button_reset_pay_mechanic} onPress = {() => setPay_Mechanic("")}>
                                <Icon name = "undo" style = {styles.button_text_reset} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style = {{marginTop : 20}}>
                            {button()}
                        </View>
                    </View> 
                </View>
            </Modal>
            {viewDetail()}
            <Header searchBar style = {styles.header_searchbar}>
                <Item style = {styles.header_searchbar_column}>
                    <TextInput placeholder="Nama Produk" value = {nameProduct} onChangeText = {(text) => handleSearchProduct(text,fullData,setNameProduct,setData,setTempData)} onFocus = {() => handleFocus(reloadData,setNameProduct,setNameMotorcycle,setData)} returnKeyType = "next" onSubmitEditing = {() => inputMotorcycle.focus()}/>
                </Item>
                <Item style = {styles.header_searchbar_column}>
                    <TextInput placeholder="Nama Kereta" value = {nameMotorcycle} onChangeText = {(text) => handleSearchMotorcycle(text,tempData,setNameMotorcycle,setData)} returnKeyType = "done" ref = {(input) => inputMotorcycle = input}/>
                </Item>
            </Header>
            <SafeAreaView style = {{flex : 1}}>
                <FlatList
                    data = {data}
                    renderItem = {_renderItem}
                    keyExtractor = {(item,index) => index.toString()}
                />
            </SafeAreaView>
            {
                dataContext.view === "home" ? 
                <Button rounded style = {styles.button_add_invoice} onPress = {() => navigation.navigate('InvoiceForm')}>
                    <Text>Buka Faktur</Text>
                </Button> : 
                <Button rounded style = {styles.button_back} onPress = {() => handleBack(dataContext,dispatch,navigation)}>
                    <Text>Kembali</Text>
                </Button>
            }
        </Container>
    )
}

export default Home