import React,{useState,useCallback} from 'react'
import { View,FlatList,Modal,TouchableOpacity,ScrollView,TextInput,Picker } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'
import { Container, Header,  List, Item, Input, Icon, Button, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

const EmployeeList = () => {
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

    useFocusEffect(useCallback(() => {
        const source = axios.CancelToken.source();
        const loadData = async () => {
            try{
                const response = await axios.get("http://192.168.43.171:5000/employee/show_employee",{cancelToken : source.token});
                setData(response.data);
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

    const handleShowModalDetail = (item) => {
        setShowModalDetail(true);
        setTemp_Detail(item);
    }

    const handleShowModalEdit = (item) => {
        setShowModalEdit(true);
        setTemp_Detail(item);
        setName(item.name);
        setAge(item.age);
        setReligion(item.religion);
        setAddress(item.address);
        setDistricts(item.districts);
        setPhone_Number(item.phone_number);
    }
    
    const handleUpdate = () => {
        const data = {
            name : name ? name : temp_detail.name,
            age : age ? parseInt(age) : parseInt(temp_detail.age),
            religion : religion ? religion : temp_detail.religion,
            address : address ? address : temp_detail.address,
            districts : districts ? districts : temp_detail.districts,
            phone_number : phone_number ? parseInt(phone_number) : temp_detail.phone_number
        }

        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/employee/update_employee/${temp_detail._id}`,
            data : data
        })
        .then(response => {
            console.log(response.data);
            setShowModalEdit(false);
        })
        .catch(error => {
            setName('');
            setAge('');
            setReligion('');
            setAddress('');
            setDistricts('');
            setPhone_Number('');
            console.log(error)
        })
    }

    const _renderItem = ({item,index }) => {
        return (
            <ListItem thumbnail>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.phone_number}</Text>
                </Body>
                <Right style = {{flexDirection : 'row'}}>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,margin : 2}} onPress = {() => handleShowModalEdit(item)}>
                        <Text>Edit</Text>
                    </Button>
                    <Button style = {{backgroundColor : '#61c0bf',borderRadius : 5,margin : 2}} onPress = {() => handleShowModalDetail(item)}>
                        <Text>Detail</Text>
                    </Button>
                </Right>
            </ListItem>
        )
    }

    const handleDelete = () => {
        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/employee/delete_employee/${temp_detail._id}`
        })
        .then(response => {
            const filter = data.filter(list => list._id !== temp_detail._id);
            setData(filter);
            setShowModalEdit(false);
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <View style = {{flex : 1,margin : 10}}>
            {/* Modal Detail */}
            <Modal visible = {showModalDetail}>
                <View style = {{flex : 1,margin : 5,borderWidth : 1,borderRadius : 7}}>
                <View style = {{padding : 100,borderWidth : 1,margin : 50}}>
                    <Text>Foto</Text>
                </View>
                
                <View>
                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>Nama</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.name}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>Umur</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.age}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>Nama</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.religion}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>Alamat</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.address}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>Kecamatan</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.districts}</Text>
                    </View>

                    <View style = {{flexDirection : 'row'}}>
                        <Text style = {{flex : 2,marginLeft : 10}}>No.Telp</Text>
                        <Text style = {{flex : 1,textAlign : 'left'}}> : </Text>
                        <Text style = {{flex : 3,textAlign : 'left'}}>{temp_detail.phone_number}</Text>
                    </View>
                </View>

                <View style = {{width : '100%', justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                    <View style = {{width : '100%'}}>
                        <TouchableOpacity style = {{backgroundColor : '#ffb6b9',padding : 10,borderRadius : 7,margin : 10}} onPress = {() => setShowModalDetail(false)}>
                            <Text style = {{textAlign : 'center'}}>Tutup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            
            <Modal visible = {showModalEdit}>
                <View style = {{flex : 1,margin : 5, borderWidth : 1,borderRadius : 7}}>
                    <View style = {{height : 450}}>
                        <ScrollView style = {{marginLeft : 10,marginRight : 10}}>
                            <View style = {{padding : 80,borderWidth : 1,marginLeft : 50,marginRight : 50,marginTop : 20,marginBottom : 20}}>
                                <Text>Foto</Text>
                            </View>

                            <View>
                                <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Nama</Text>
                                <TextInput
                                    value = {name}
                                    placeholder = "Masukan Nama"
                                    style = {{borderBottomWidth : 1,fontSize : 16}}
                                    onChangeText = {(e) => setName(e)}
                                    returnKeyType = "next" 
                                    onSubmitEditing = {() => inputAge.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <View style = {{flexDirection : 'row'}}>
                                    <View style = {{flex : 1}}>
                                        <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Umur</Text>
                                        <TextInput
                                            value = {age.toString()}
                                            placeholder = "Masukan Umur"
                                            style = {{borderBottomWidth : 1,fontSize : 16}}
                                            onChangeText = {(e) => setAge(e)}
                                            keyboardType = "number-pad"
                                            ref = {(input) => inputAge = input}
                                            returnKeyType = "next"
                                            onSubmitEditing = {() => inputAddress.focus()}
                                        />
                                    </View>

                                    <View style = {{flex : 1}}>
                                        <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Agama</Text>
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
                                <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Alamat</Text>
                                <TextInput
                                    value = {address}
                                    placeholder = "Masukan Alamat"
                                    style = {{borderBottomWidth : 1,fontSize : 16}}
                                    onChangeText = {(e) => setAddress(e)}
                                    ref = {(input) => inputAddress = input}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => inputDistricts.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Kecamatan</Text>
                                <TextInput
                                    value = {districts}
                                    placeholder = "Masukan Nama"
                                    style = {{borderBottomWidth : 1,fontSize : 16}}
                                    onChangeText = {(e) => setDistricts(e)}
                                    ref = {(input) => inputDistricts = input}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => inputPhoneNumber.focus()}
                                />
                            </View>

                            <View style = {{marginTop : 20}}>
                                <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Nomor Telepon</Text>
                                <TextInput
                                    value = {phone_number.toString()}
                                    placeholder = "Masukan Nomor Telepon"
                                    style = {{borderBottomWidth : 1,fontSize : 16}}
                                    onChangeText = {(e) => setPhone_Number(e)}
                                    keyboardType = "number-pad"
                                    ref = {(input) => inputPhoneNumber = input}
                                    returnKeyType = "done"
                                />
                            </View>
                        </ScrollView>
                    </View>

                    <View style = {{width : '100%', justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                        <View style = {{width : '100%'}}>
                            <TouchableOpacity style = {{flex : 1, backgroundColor : '#ffb6b9',padding : 10,borderRadius : 7,margin : 10}} onPress = {handleDelete}>
                                <Text style = {{textAlign : 'center'}}>Hapus Mekanik</Text>
                            </TouchableOpacity>
                        </View>

                        <View style = {{width : '100%',flexDirection : 'row'}}>
                            <TouchableOpacity style = {{flex : 1, backgroundColor : '#ffb6b9',padding : 10,borderRadius : 7,margin : 10}} onPress = {() => setShowModalEdit(false)}>
                                <Text style = {{textAlign : 'center'}}>Batal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {{flex : 1, backgroundColor : '#61c0bf',padding : 10,borderRadius : 7,margin : 10}} onPress = {handleUpdate}>
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

export default EmployeeList
