import React,{useState,useCallback} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert,Modal,ScrollView } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'
import {
    handleAddSelectionType,
    handleRemoveSelectionType,
    handleUpdate,
    handleDelete,
    handleFilterType,
    handleSelectedFilterType,
    handleCloseModalShow
} from './Components/Functions/ProductDetail'
import {formatRupiah} from '../../Global_Functions/Functions'
import styles from './Components/Styles/ProductDetail'

const ProductDetail = ({navigation}) => {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [capital,setCapital ] = useState(0);
    const [price,setPrice] = useState(0);
    const [qty,setQty] = useState('');
    
    const [type,setType] = useState([]);
    const [selectionType,setSelectionType] = useState([]);

    // Temp
    const [tempSelectionType,setTempSelectionType] = useState([]);
    const [tempType,setTempType] = useState([]);

    // Counter change
    const [counterSelectionType,setCounterSelectionType] = useState(false);

    const [modalShow,setModalShow] = useState(false);
    const [filterType,setFilterType] = useState('');
    const [selectionFilterType,setSelectionFilterType] = useState('');

    useFocusEffect(useCallback(() => {
        setId(navigation.state.params._id);
        setName(navigation.state.params.product_name);
        // Capital
        formatRupiah(navigation.state.params.product_capital.toString(),'Rp. ',setCapital);
        // Price
        formatRupiah(navigation.state.params.product_price.toString(),'Rp. ',setPrice);
        setQty(navigation.state.params.qty);
        setSelectionType(navigation.state.params.product_type);

        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/motorcycle/show_motorcycle",{cancelToken : source.token});
                var uniqueResultOne = response.data.filter(function(obj) {
                    return !navigation.state.params.product_type.some(function(obj2) {
                        return obj._id == obj2._id;
                    });
                });

                //Find values that are in result2 but not in result1
                var uniqueResultTwo = navigation.state.params.product_type.filter(function(obj) {
                    return !response.data.some(function(obj2) {
                        return obj._id == obj2._id;
                    });
                });

                //Combine the two arrays of unique entries
                var result = uniqueResultOne.concat(uniqueResultTwo);
                setType(result);
                setTempType(result);

                const response_selection_type = await axios.get(`http://192.168.43.171:5000/product/detail_product/${navigation.state.params._id}`,{cancelToken : source.token});
                setSelectionType(response_selection_type.data.product_type);
                setTempSelectionType(response_selection_type.data.product_type);
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

    const viewType = () => type.map((list,index) => {
        return (
            <View style = {styles.row} key = {index}>
                <View style = {styles.container_type}>
                    <View style = {styles.row}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = {() => handleAddSelectionType(list._id,list,type,tempType,setSelectionType,setTempSelectionType,setType,setTempType)}>
                    <View style = {styles.button_add_type} >
                        <Text style = {{color : 'white'}}>Tambah</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    });

    const viewSelectionType = () => selectionType.map((list,index) => {
        return (
            <View style={styles.row} key = {index}>
                <View style = {styles.container_type}>
                    <View style = {styles.row}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity  onPress = {() => handleRemoveSelectionType(list._id,list,selectionType,tempSelectionType,setType,setTempType,setSelectionType,setTempSelectionType)}>
                    <View style = {styles.button_delete_selection}>
                        <Text>Hapus</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    });

    return (
        <View style = {styles.container}>
            <Modal visible = {modalShow}>
                <View style = {styles.container_modal}>
                    <View style = {styles.first_cell}>
                        <View style = {styles.row}>
                            <Text style = {styles.modal_title_text}>Pilih Jenis Kereta</Text>
                            <View style = {styles.container_picker}>
                                <Text style = {{flex : 1}}>Filter : </Text>
                                <Picker  
                                    style = {{flex : 2}}
                                    selectedValue = {filterType}
                                    onValueChange = {(value) => handleFilterType(value,tempType,setFilterType,setType)}
                                >
                                    <Picker label = "Semua" value = {"All"}/>
                                    <Picker label = "Honda" value = {"Honda"} />
                                    <Picker label = "Yamaha" value = {"Yamaha"} />
                                </Picker>
                            </View>
                        </View>
                        <ScrollView>
                            {viewType()}
                        </ScrollView>
                    </View>

                    <View style = {styles.second_cell}>
                        <View style = {styles.row}>
                            <Text style = {styles.modal_title_text}>Jenis Kereta Terpilih</Text>
                            <View style = {styles.container_picker}>
                                <Text style = {{flex : 1}}>Filter : </Text>
                                <Picker  
                                    style = {{flex : 2}}
                                    selectedValue = {selectionFilterType}
                                    onValueChange = {(value) => handleSelectedFilterType(value,tempSelectionType,setSelectionFilterType,setSelectionType)}
                                >
                                    <Picker label = "Semua" value = {"All"}/>
                                    <Picker label = "Honda" value = {"Honda"} />
                                    <Picker label = "Yamaha" value = {"Yamaha"} />
                                </Picker>
                            </View>
                        </View>
                        <ScrollView>
                            {viewSelectionType()}
                        </ScrollView>
                    </View>
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity  style = {styles.button_modal_back} onPress = {() => handleCloseModalShow(tempType,tempSelectionType,type,selectionType,setModalShow,setFilterType,setSelectionFilterType,setType,setSelectionType)}>
                        <Text style = {styles.button_text}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style = {styles.button_modal_ok} onPress = {() => handleCloseModalShow(tempType,tempSelectionType,type,selectionType,setModalShow,setFilterType,setSelectionFilterType,setType,setSelectionType)}>
                        <Text style = {styles.button_text}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
            {/* Product Name */}
            <Text style = {styles.title_text}>Nama Produk</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                    value = {name}
                    style = {styles.text_input}
                    onChangeText = {(e) => setName(e)}
                    returnKeyType = "next" 
                    onSubmitEditing = {() => inputCapital.focus()}
                />
            </TouchableWithoutFeedback>

            <View style = {styles.row_price_capital}>
                {/* Product Capital */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {styles.cell_price_capital}>
                        <Text style = {styles.title_text}>Modal</Text>
                        <TextInput
                            value = {capital.toString()}
                            style = {styles.text_input}
                            onChangeText = {(e) => formatRupiah(e,'Rp. ',setCapital)}
                            keyboardType = "numeric"
                            returnKeyType = "next" 
                            onSubmitEditing = {() => inputPrice.focus()}
                            ref = {(input) => inputCapital = input}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {/* Product Price */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {styles.cell_price_capital}>
                        <Text style = {styles.title_text}>Harga Jual</Text>
                        <TextInput
                            value = {price.toString()}
                            style = {styles.text_input}
                            onChangeText = {(e) => formatRupiah(e,'Rp. ',setPrice)}
                            keyboardType = "numeric"
                            ref = {(input) => inputPrice = input}
                            onSubmitEditing = {() => inputQty.focus()}
                            returnKeyType = "next"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity style = {styles.button_picker_motorcycle} onPress = {() => setModalShow(true)}>
                <Text style = {styles.button_picker_text_motorcycle}>Jumlah Tipe Kereta : {tempSelectionType.length}</Text>
            </TouchableOpacity>
            <View style = {{marginTop : 20}}>
                <Text style = {styles.title_text}>Jumlah Produk</Text>
                <TextInput
                    value = {qty.toString()}
                    onChangeText = {(e) => setQty(e)}
                    style = {styles.text_input}
                    ref = {(input) => inputQty = input}
                    returnKeyType = "done"
                />
            </View>

            <View style = {styles.container_button}>
                <View style = {styles.row}>
                    <TouchableOpacity  style = {styles.button_delete} onPress = {() => handleDelete(id,Alert,navigation)}>
                        <Text style = {styles.button_text}>Hapus Produk</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button_save} onPress = {() => handleUpdate(id,name,capital,price,tempSelectionType,qty,Alert,navigation)}>
                        <Text style = {styles.button_text}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductDetail