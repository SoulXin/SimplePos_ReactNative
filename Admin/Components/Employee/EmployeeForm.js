import React,{useState,useCallback} from 'react'
import { View, Text,TextInput, Alert,Picker,ScrollView,TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from 'react-navigation-hooks'

const EmployeeForm = ({navigation}) => {
    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [religion,setReligion] = useState('Islam');
    const [address,setAddress] = useState('');
    const [districts,setDistricts] = useState('');
    const [phone_number,setPhone_Number] = useState('');

    useFocusEffect(useCallback(() => {

        return () => {
            setName('');
            setAge('');
            setReligion('Islam');
            setAddress('');
            setDistricts('');
            setPhone_Number('');
        }
    },[]));

    const handleAdd = () => {
        const data = {
            name : name,
            age : parseInt(age),
            religion : religion,
            address : address,
            districts : districts,
            phone_number : parseInt(phone_number)
        }

        axios({
            method : 'POST',
            url : `http://192.168.43.171:5000/employee/add_employee`,
            data : data
        })
        .then(response => {
            setName('');
            setAge('');
            setReligion('Islam');
            setAddress('');
            setDistricts('');
            setPhone_Number('');
            Alert.alert('Pemberitahuan','Mekanik Berhasil Di Tambahkan',[{text : 'OK', onPress : () => navigation.navigate('EmployeeList')}]);
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <View style = {{flex : 1,margin : 10}}>
            <ScrollView>

                <View style = {{marginTop : 20}}>
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
                                value = {age}
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
                                selectedValue = {religion}
                                onValueChange = {(value) => setReligion(value)}
                            >
                                <Picker label = "Islam" value = {"Islam"} />
                                <Picker label = "Kristen" value = {"Kristen"} />
                                <Picker label = "Buddha" value = {"Buddha"}/>
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
                        value = {phone_number}
                        placeholder = "Masukan Nomor Telepon"
                        style = {{borderBottomWidth : 1,fontSize : 16}}
                        onChangeText = {(e) => setPhone_Number(e)}
                        keyboardType = "number-pad"
                        ref = {(input) => inputPhoneNumber = input}
                        returnKeyType = "done"
                    />
                </View>
            </ScrollView>

            <View style = {{width : '100%', justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                <View style = {{width : '100%'}}>
                    <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,borderRadius : 7}} onPress = {handleAdd}>
                        <Text style = {{textAlign : 'center'}}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default EmployeeForm
