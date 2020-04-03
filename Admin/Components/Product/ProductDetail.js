import React,{useState,useCallback} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert,Modal,ScrollView } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'
import {formatRupiah,removeFormatMoney} from './Components/Functions'

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
            <View style = {{flexDirection : 'row'}} key = {index}>
                <View style = {{padding : 5,margin : 5,backgroundColor : '#e3fdfd',borderRadius : 5,flex : 5}}>
                    <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress = {() => handleAddSelectionType(list._id,list)}>
                    <View style = {{padding : 5,margin : 5,backgroundColor : '#61c0bf',borderRadius : 5,flex : 1}} >
                        <Text style = {{color : 'white'}}>Tambah</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    });

    const viewSelectionType = () => selectionType.map((list,index) => {
        return (
            <View style={{ flexDirection: 'row'}} key = {index}>
                <View style = {{padding : 5,margin : 5,backgroundColor : '#e3fdfd',borderRadius : 5,flex : 5}}>
                    <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                        <Text style = {{flex : 1}}>{list.category}</Text>
                        <Text style = {{flex : 3}}>{list.name}</Text>
                    </View>
                </View>
                <TouchableOpacity  onPress = {() => handleRemoveSelectionType(list._id,list)}>
                    <View style = {{padding : 5,margin : 5,backgroundColor : '#ffb6b9',borderRadius : 5,flex : 1}}>
                        <Text>Hapus</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })
    const handleAddSelectionType = (id,list) => {
        let temp_Data = type.filter(list => list._id !== id);
        let temp_Selection = tempType.filter(list => list._id !== id);
        setSelectionType(old => [...old,list]);
        setTempSelectionType(old => [...old,list]);
        setType(temp_Data)
        setTempType(temp_Selection);
    }

    const handleRemoveSelectionType = (id,list) => {
        let temp_Data = selectionType.filter(list => list._id !== id);
        let temp_Selection = tempSelectionType.filter(list => list._id !== id);
        setType(old => [...old,list]);
        setTempType(old => [...old,list]);
        setSelectionType(temp_Data);
        setTempSelectionType(temp_Selection);
    }

    const handleUpdate = () => {
        const data = {
            product_name : name,
            product_capital : removeFormatMoney(capital),
            product_price : removeFormatMoney(price),
            product_type : selectionType,
            qty : parseInt(qty)
        };
        if(name.length < 4){
            Alert.alert('Pemberitahuan','Nama Produk Harus Lebih Dari 3 Kata',[{text: 'OK'}]);
        }else if(removeFormatMoney(capital) > removeFormatMoney(price)){
            Alert.alert('Pemberitahuan','Modal Tidak Boleh Lebih Besar Dari Harga Jual',[{text: 'OK'}]);
        }else if(capital < 1){
            Alert.alert('Pemberitahuan','Modal Tidak Boleh 0',[{text: 'OK'}]);
        }else if(selectionType.length < 1){
            Alert.alert('Pemberitahuan','Jumlah Tipe Kereta Tidak Boleh Kosong',[{text: 'OK'}]);
        }else{
            axios({
                method : 'PUT',
                url : `http://192.168.43.171:5000/product/update_product/${id}`,
                data : data
            })
            .then(response => {
                Alert.alert('Berhasil','Pembaharuan Data Telah Berhasil',[{text: 'OK', onPress: () => navigation.navigate('ProductList')}]);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const handleDelete = () => {
        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/product/delete_product/${id}`
        })
        .then(response => {
            Alert.alert('Pemberitahuan','Produk Berhasil Di Hapus',[{text : 'OK', onPress : () => navigation.navigate('ProductList')}])
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleFilterType = (value) => {
        setFilterType(value);
        if(value !== "All"){
            const filter_type = tempType.filter(list => list.category === value);
            setType(filter_type);
        }else{
            setType(tempType)
        }
    }

    const handleSelectedFilterType = (value) => {
        setSelectionFilterType(value);
        if(value !== "All"){
            const filter_selection_type =  tempSelectionType.filter(list => list.category === value);
            setSelectionType(filter_selection_type);
        }else{
            setSelectionType(tempSelectionType);
        }
    }

    const handleCloseModalShow = () => {
        setModalShow(false);
        setFilterType("All");
        setSelectionFilterType("All");

        if(tempType.length !== type.length){
            setType(tempType)
        }

        if(tempSelectionType.length !== selectionType.length){
            setSelectionType(tempSelectionType)
        }
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
                                    onValueChange = {(value) => handleFilterType(value)}
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
                                    selectedValue = {selectionFilterType}
                                    onValueChange = {(value) => handleSelectedFilterType(value)}
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
                    <TouchableOpacity  style = {{backgroundColor : '#e3fdfd',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleCloseModalShow}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleCloseModalShow}>
                        <Text style = {{textAlign : 'center',fontSize : 14,color : 'white'}}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            
            {/* Product Name */}
            <Text style = {{fontWeight : 'bold',fontSize : 16}}>Nama Produk</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <TextInput
                    value = {name}
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
                            style = {{borderBottomWidth : 1,fontSize : 16}}
                            onChangeText = {(e) => formatRupiah(e,'Rp. ',setPrice)}
                            keyboardType = "numeric"
                            ref = {(input) => inputPrice = input}
                            onSubmitEditing = {() => inputQty.focus()}
                            returnKeyType = "next"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableOpacity style = {{backgroundColor : '#61c0bf',borderRadius : 10,padding : 10,marginTop : 20}} onPress = {() => setModalShow(true)}>
                <Text style = {{textAlign : 'center',fontSize  : 14,color : 'white'}}>Jumlah Tipe Kereta : {tempSelectionType.length}</Text>
            </TouchableOpacity>
            <View style = {{marginTop : 20}}>
                <Text style = {{fontWeight : 'bold',fontSize : 16}}>Jumlah Produk</Text>
                <TextInput
                    value = {qty.toString()}
                    onChangeText = {(e) => setQty(e)}
                    style = {{borderBottomWidth : 1,fontSize : 16}}
                    ref = {(input) => inputQty = input}
                    returnKeyType = "done"
                />
            </View>

            <View style = {{flexDirection: 'column',width : '100%',justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                <View style = {{flex : 1,width : '100%'}}>
                    <TouchableOpacity style = {{backgroundColor : '#ffb6b9',padding : 10,margin : 10,borderRadius : 10,alignItems : 'center'}} onPress = {handleDelete}>
                        <Text style = {{fontSize : 14}}>Hapus Produk</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flexDirection : 'row',flex : 1}}>
                    <TouchableOpacity  style = {{backgroundColor : '#e3fdfd',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {() => navigation.navigate('ProductList')}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleUpdate}>
                        <Text style = {{textAlign : 'center',fontSize : 14,color : 'white'}}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductDetail