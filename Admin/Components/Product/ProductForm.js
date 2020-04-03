import React, { useState, useEffect } from 'react'
import { View, Text,TextInput,Picker, Alert ,Modal,TouchableOpacity,ScrollView,TouchableWithoutFeedback,Keyboard} from 'react-native'
import axios from 'axios'
import {formatRupiah,removeFormatMoney} from './Components/Functions'

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

    const handleSubmit = () => {
        const data = {
            product_name : name,
            product_capital : removeFormatMoney(capital),
            product_price : removeFormatMoney(price),
            product_type : selectionType,
            qty : qty
        }

        if(name.length < 4){
            Alert.alert('Pemberitahuan','Panjang Nama Produk harus Lebih Besar Dari 3',[{text : 'OK'}])
        }else if(capital < 1){
            Alert.alert('Pemberitahuan','Modal Barang Tidak Boleh Nol Atau Minus',[{text : 'OK'}])
        }else if(removeFormatMoney(capital) > removeFormatMoney(price)){
            Alert.alert('Pemberitahuan','Modal Barang Tidak Boleh Lebih Besar Dari Nilai Jual',[{text : 'OK'}])
        }else if(selectionType.length < 1){
            Alert.alert('Pemberitahuan','Pilih Salah Satu Jenis Kereta',[{text : 'OK'}])
        }else{
            axios({
                method : 'POST',
                url : `http://192.168.43.171:5000/product/add_product`,
                data : data
            })
            .then(response => {
                console.log(response)
                Alert.alert('Pemberitahuan','Produk Berhasil Di Tambahkan',[{text : 'OK',onPress : () => navigation.navigate('ProductList')}])
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const viewType = () => dataType.map((list,index) => {
        return (
            <View style = {{flexDirection : 'row'}} key = {index}>
                <View style = {{padding : 5,margin : 5,backgroundColor : '#bbded6',borderRadius : 5,flex : 5}}>
                    <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = {() => handleAddSelectionType(list._id,list)}>
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
                <TouchableOpacity  onPress = {() => handleRemoveSelectionType(list._id,list)}>
                    <View style = {{padding : 5,margin : 5,backgroundColor : '#bbded6',borderRadius : 5,flex : 1}}>
                        <Text>Hapus</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })
    const handleAddSelectionType = (id,list) => {
        let temp_Data = dataType.filter(list => list._id !== id);
        let temp_Selection = tempDataType.filter(list => list._id !== id);
        setDataType(temp_Data);
        setTempDataType(temp_Selection);
        setSelectionType(old => [...old,list]);
        setTempSelectionType(old => [...old,list]);
    }

    const handleRemoveSelectionType = (id,list) => {
        let temp_Data = selectionType.filter(list => list._id !== id);
        let temp_Selection = tempSelectionType.filter(list => list._id !== id);
        setSelectionType(temp_Data);
        setTempSelectionType(temp_Selection);
        setDataType(old => [...old,list]);
        setTempDataType(old => [...old,list]);
    }

    const handleFilterDataType = (value) => {
        setFilterType(value);
        if(value !== "All"){
            const filter_type =  tempDataType.filter(list => list.category === value);
            setDataType(filter_type);
        }else{
            setDataType(tempDataType);
        }
    }

    const handleFilterSelectionType = (value) => {
        setFilterSelectionType(value);
        if(value !== "All"){
            const filter_type =   tempSelectionType.filter(list => list.category === value);
            setSelectionType(filter_type);
        }else{
            setSelectionType(tempSelectionType);
        }
    }

    const handleCloseModalShow = () => {
        setModalShow(false);
        setFilterType("All");
        setFilterSelectionType("All");
    }
    return (
        <View style = {{flex : 1,margin : 10}}>
            <Modal visible = {modalShow}>
                <View style = {{flexDirection : 'column',flex : 1,margin : 10}}>
                    <View style = {{flex : 1,padding : 5,borderRadius : 5}}>
                        <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                            <Text style = {{fontSize : 18,margin : 5,flex : 1}}>Pilih Jenis Kereta</Text>
                            <View style = {{flex : 1,flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                                <Text style = {{flex : 1}}>Filter : </Text>
                                <Picker  
                                    style = {{flex : 2}}
                                    selectedValue = {filterType}
                                    onValueChange = {(value) => handleFilterDataType(value)}
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

                    <View style = {{flex : 1,borderWidth : 1,padding : 5,borderRadius : 5,borderColor : '#61c0bf'}}>
                        <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                            <Text style = {{fontSize : 18,margin : 5,flex : 1}}>Jenis Kereta Terpilih</Text>
                            <View style = {{flex : 1,flexDirection : 'row',justifyContent : 'center',alignItems : 'center'}}>
                                <Text style = {{flex : 1}}>Filter : </Text>
                                <Picker  
                                style = {{flex : 2}}
                                    selectedValue = {filterSelectionType}
                                    onValueChange = {(value) => handleFilterSelectionType(value)}
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
                <View style = {{flexDirection : 'row'}}>
                    <TouchableOpacity  style = {{backgroundColor : '#cbf1f5',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleCloseModalShow}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style = {{backgroundColor : '#71c9ce',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleCloseModalShow}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* Product Name */}
            <Text style = {{fontWeight : 'bold',fontSize : 16}}>Nama Produk</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                    placeholder = "Masukan Nama Produk"
                    style = {{borderBottomWidth : 1,fontSize : 16}}
                    onChangeText = {(e) => setName(e)}
                    returnKeyType = "next" 
                    onSubmitEditing = {() => inputCapital.focus()}
                />
            </TouchableWithoutFeedback>

            <View style = {{flexDirection : 'row',justifyContent : 'space-around',alignItems : 'center',marginTop : 20}}>
                {/* Product Capital */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1,marginRight : 5}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 16}}>Modal</Text>
                        <TextInput
                            value = {capital}
                            placeholder = "Masukan Modal Produk"
                            style = {{borderBottomWidth : 1,fontSize : 16}}
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
                    <View style = {{flex : 1,marginLeft : 5}}>
                        <Text style = {{fontWeight : 'bold',fontSize : 16}}>Harga Jual</Text>
                        <TextInput
                            value = {price}
                            placeholder = "Masukan Harga Jual Produk"
                            style = {{borderBottomWidth : 1,fontSize : 16}}
                            onChangeText = {(e) => formatRupiah(e,'Rp. ',setPrice)}
                            keyboardType = "numeric"
                            onSubmitEditing = {() => inputQty.focus()}
                            ref = {(input) => inputPrice = input}
                            returnKeyType = "next"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity style = {{backgroundColor : '#61c0bf',borderRadius : 10,padding : 10,marginTop : 20}} onPress = {() => setModalShow(true)}>
                <Text style = {{textAlign : 'center',fontSize  :14}}>Jumlah Tipe Kereta : {tempSelectionType.length}</Text>
            </TouchableOpacity>
            <View style = {{marginTop : 20}}>
                <Text style = {{fontWeight : 'bold',fontSize : 16}}>Jumlah Produk</Text>
                <TextInput
                    value = {qty}
                    onChangeText = {(e) => setQty(e)}
                    style = {{borderBottomWidth : 1,fontSize : 16}}
                    ref = {(input) => inputQty = input}
                    returnKeyType = "done"
                />
            </View>

            <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                <TouchableOpacity  style = {{backgroundColor : '#bbded6',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {() => navigation.navigate('ProductList')}>
                    <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleSubmit}>
                    <Text style = {{textAlign : 'center',fontSize : 14}}>Tambah Produk</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ProductForm