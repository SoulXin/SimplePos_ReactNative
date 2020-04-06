import React, { useState, useEffect } from 'react'
import { View, Text,TextInput,Picker, Alert ,Modal,TouchableOpacity,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import axios from 'axios'
import {
    handleSubmit,
    handleAddSelectionType,
    handleRemoveSelectionType,
    handleFilterDataType,
    handleFilterSelectionType,
    handleCloseModalShow
} from './Components/Functions/ProductForm'
import {formatRupiah} from '../../Global_Functions/Functions'
import styles from './Components/Styles/ProductForm'

const ProductForm = ({navigation}) => {
    const [name,setName] = useState('');
    const [capital,setCapital] = useState(0);
    const [price,setPrice] = useState(0);
    const [qty,setQty] = useState(1);
    const [dataType,setDataType] = useState([])
    const [selectionType,setSelectionType] = useState([]);
    // Temp
    const [tempDataType,setTempDataType] = useState([]);
    const [tempSelectionType,setTempSelectionType] = useState([]);

    // Filter
    const [filterType,setFilterType] = useState('');
    const [filterSelectionType,setFilterSelectionType] = useState('');

    const [modalShow,setModalShow] = useState(false);

   useEffect(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/motorcycle/show_motorcycle",{cancelToken : source.token});
                setDataType(response.data);
                setTempDataType(response.data);

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
   }, [])

    const viewType = () => dataType.map((list,index) => {
        return (
            <View style = {{flexDirection : 'row'}} key = {index}>
                <View style = {{padding : 5,margin : 5,backgroundColor : '#bbded6',borderRadius : 5,flex : 5}}>
                    <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = {() => handleAddSelectionType(list._id,list,dataType,tempDataType,setDataType,setTempDataType,setSelectionType,setTempSelectionType)}>
                    <View style = {{padding : 5,margin : 5,backgroundColor : '#61c0bf',borderRadius : 5,flex : 1}} >
                        <Text>Tambah</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })

    const viewSelectionType = () => selectionType.map((list,index) => {
        return (
            <View style={{ flexDirection: 'row'}} key = {index}>
                <View style = {{padding : 5,margin : 5,backgroundColor : '#61c0bf',borderRadius : 5,flex : 5}}>
                    <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity  onPress = {() => handleRemoveSelectionType(list._id,list,selectionType,tempSelectionType,setSelectionType,setTempSelectionType,setDataType,setTempDataType)}>
                    <View style = {{padding : 5,margin : 5,backgroundColor : '#bbded6',borderRadius : 5,flex : 1}}>
                        <Text>Hapus</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })
    
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
                                    onValueChange = {(value) => handleFilterDataType(value,tempDataType,setFilterType,setDataType)}
                                >
                                    <Picker.Item label = "Semua" value = {"All"}/>
                                    <Picker.Item label = "Honda" value = {"Honda"} />
                                    <Picker.Item label = "Yamaha" value = {"Yamaha"} />
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
                                    selectedValue = {filterSelectionType}
                                    onValueChange = {(value) => handleFilterSelectionType(value,tempSelectionType,setFilterSelectionType,setSelectionType)}
                                >
                                    <Picker.Item label = "Semua" value = {"All"}/>
                                    <Picker.Item label = "Honda" value = {"Honda"} />
                                    <Picker.Item label = "Yamaha" value = {"Yamaha"} />
                                </Picker>
                            </View>
                        </View>
                        <ScrollView>
                            {viewSelectionType()}
                        </ScrollView>
                    </View>
                </View>
                <View style = {styles.row}>
                    <TouchableOpacity  style = {styles.button_modal_back} onPress = {() => handleCloseModalShow(setModalShow,setFilterType,setFilterSelectionType)}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style = {styles.button_modal_ok} onPress = {() => handleCloseModalShow(setModalShow,setFilterType,setFilterSelectionType)}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Product Name */}
            <Text style = {styles.title_text}>Nama Produk</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                    placeholder = "Masukan Nama Produk"
                    style = {styles.text_input}
                    onChangeText = {(e) => setName(e)}
                    returnKeyType = "next" 
                    onSubmitEditing = {() => inputCapital.focus()}
                />
            </TouchableWithoutFeedback>

            <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center',marginTop : 20}}>
                {/* Product Capital */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {styles.cell_price_capital}>
                        <Text style = {{fontWeight : 'bold',fontSize : 16}}>Modal</Text>
                        <TextInput
                            value = {capital.toString()}
                            placeholder = "Masukan Modal Produk"
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
                            placeholder = "Masukan Harga Jual Produk"
                            style = {styles.text_input}
                            onChangeText = {(e) => formatRupiah(e,'Rp. ',setPrice)}
                            keyboardType = "numeric"
                            onSubmitEditing = {() => inputQty.focus()}
                            ref = {(input) => inputPrice = input}
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
                <TouchableOpacity style = {styles.button_add} onPress = {() => handleSubmit(name,capital,price,selectionType,qty,Alert,navigation)}>
                    <Text style = {styles.button_text}>Tambah Produk</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ProductForm