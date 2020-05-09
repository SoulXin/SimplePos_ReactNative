import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,TouchableOpacity,ScrollView,TextInput,Picker } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Button, ListItem, Body, Right, Text } from 'native-base';
import { 
    handleShowModalDetail,
    handleShowModalEdit,
    handleUpdate,
    handleDelete
 } from './Components/Functions/MechanicList'
import styles from './Components/Styles/MechanicList'
import { checkUserSignedIn, clear_AsyncStorage } from '../../Global_Functions/Functions'
import Loading from '../Modal_Loading/Loading'

const MechanicList = ({navigation}) => {
    const [data,setData] = useState([]);
    const [temp_detail,setTemp_Detail] = useState('');
    const [showModalDetail,setShowModalDetail] = useState(false);
    const [showModalEdit,setShowModalEdit] = useState(false);
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [religion,setReligion] = useState('');
    const [address,setAddress] = useState('');
    const [districts,setDistricts] = useState('');
    const [phone_number,setPhone_Number] = useState('');
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/employee/show_employee/${res.user._id}`,{cancelToken : source.token});
                    setData(response.data);
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
            source.cancel();
            setData([]);
        }
    },[]));

    const _renderItem = ({item,index }) => {
        return (
            <ListItem thumbnail>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.phone_number}</Text>
                </Body>
                <Right style = {styles.row}>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,margin : 2}} onPress = {() => handleShowModalEdit(item,setShowModalEdit,setTemp_Detail,setName,setAge,setReligion,setAddress,setDistricts,setPhone_Number)}>
                        <Text>Edit</Text>
                    </Button>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,margin : 2}} onPress = {() => handleShowModalDetail(item,setShowModalDetail,setTemp_Detail)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    return (
        <View style = {{flex : 1,margin : 10}}>
            <Loading loading = {loading}/>
            {/* Modal Detail */}
            <Modal visible = {showModalDetail}>
                <View style = {styles.container_modal}>
                    <View style = {{padding : 100,borderWidth : 1,margin : 50}}>
                        <Text>Foto</Text>
                    </View>
                    
                    <View>
                        <View style = {styles.row}>
                            <Text style = {styles.left}>Nama</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.name}</Text>
                        </View>

                        <View style = {styles.row}>
                            <Text style = {styles.left}>Umur</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.age}</Text>
                        </View>

                        <View style = {styles.row}>
                            <Text style = {styles.left}>Nama</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.religion}</Text>
                        </View>

                        <View style = {styles.row}>
                            <Text style = {styles.left}>Alamat</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.address}</Text>
                        </View>

                        <View style = {styles.row}>
                            <Text style = {styles.left}>Kecamatan</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.districts}</Text>
                        </View>

                        <View style = {styles.row}>
                            <Text style = {styles.left}>No.Telp</Text>
                            <Text style = {styles.center}> : </Text>
                            <Text style = {styles.right}>{temp_detail.phone_number}</Text>
                        </View>
                    </View>

                    <View style = {styles.container_button_close}>
                        <View style = {{width : '100%'}}>
                            <TouchableOpacity style = {styles.container_box_button_close} onPress = {() => setShowModalDetail(false)}>
                                <Text style = {{textAlign : 'center'}}>Tutup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <Modal visible = {showModalEdit}>
                <View style = {styles.container_modal_edit}>
                    <View style = {{flex : 8}}>
                        <ScrollView style = {styles.container_scrollview}>
                            <View style = {{padding : 80,borderWidth : 1,marginLeft : 50,marginRight : 50,marginTop : 20,marginBottom : 20}}>
                                <Text>Foto</Text>
                            </View>

                            <View>
                                <Text  style = {styles.title_text}>Nama</Text>
                                <TextInput
                                    value = {name}
                                    placeholder = "Masukan Nama"
                                    style = {styles.text_input}
                                    onChangeText = {(e) => setName(e)}
                                    returnKeyType = "next" 
                                    onSubmitEditing = {() => inputAge.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <View style = {styles.row}>
                                    <View style = {{flex : 1}}>
                                        <Text  style = {styles.title_text}>Umur</Text>
                                        <TextInput
                                            value = {age.toString()}
                                            placeholder = "Masukan Umur"
                                            style = {styles.text_input}
                                            onChangeText = {(e) => setAge(e)}
                                            keyboardType = "number-pad"
                                            ref = {(input) => inputAge = input}
                                            returnKeyType = "next"
                                            onSubmitEditing = {() => inputAddress.focus()}
                                        />
                                    </View>

                                    <View style = {{flex : 1}}>
                                        <Text  style = {styles.title_text}>Agama</Text>
                                        <Picker
                                            selectedValue = {religion.toString()}
                                            onValueChange = {(value) => setReligion(value)}
                                        >
                                            <Picker label = "Islam" value = "Islam" />
                                            <Picker label = "Kristen" value = "Kristen" />
                                            <Picker label = "Buddha" value = "Buddha"/>
                                        </Picker>
                                    </View>
                                </View>
                            </View>

                            <View style = {{marginTop : 20}}>
                                <Text  style = {styles.title_text}>Alamat</Text>
                                <TextInput
                                    value = {address}
                                    placeholder = "Masukan Alamat"
                                    style = {styles.text_input}
                                    onChangeText = {(e) => setAddress(e)}
                                    ref = {(input) => inputAddress = input}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => inputDistricts.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <Text  style = {styles.title_text}>Kecamatan</Text>
                                <TextInput
                                    value = {districts}
                                    placeholder = "Masukan Nama"
                                    style = {styles.text_input}
                                    onChangeText = {(e) => setDistricts(e)}
                                    ref = {(input) => inputDistricts = input}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => inputPhoneNumber.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <Text  style = {styles.title_text}>Nomor Telepon</Text>
                                <TextInput
                                    value = {phone_number.toString()}
                                    placeholder = "Masukan Nomor Telepon"
                                    style = {styles.text_input}
                                    onChangeText = {(e) => setPhone_Number(e)}
                                    keyboardType = "number-pad"
                                    ref = {(input) => inputPhoneNumber = input}
                                    returnKeyType = "done"
                                />
                            </View>
                        </ScrollView>
                    </View>

                    <View style = {styles.row_bottom}>
                        <View style = {{width : '100%',flexDirection : 'row'}}>
                            <TouchableOpacity style = {styles.button_cancel} onPress = {() => handleDelete(temp_detail,data,setData,setShowModalEdit,setLoading)}>
                                <Text style = {{textAlign : 'center'}}>Hapus Mekanik</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {styles.button_save} onPress = {() => handleUpdate(temp_detail,name,age,religion,address,districts,phone_number,setShowModalEdit,setName,setAge,setReligion,setAddress,setDistricts,setPhone_Number,setLoading)}>
                                <Text style = {{textAlign : 'center'}}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <FlatList
                data = {data}
                renderItem = {_renderItem}
                keyExtractor = {(item,index) => index.toString()}
            />
        </View>
    )
}

export default MechanicList