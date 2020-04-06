import React,{useState,useCallback} from 'react'
import { View, Text,TextInput, Alert,Picker,ScrollView,TouchableOpacity } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import {handleAdd} from './Components/Functions/MechanicForm'
import styles from './Components/Styles/MechanicForm'

const MechaniceForm = ({navigation}) => {
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

    return (
        <View style = {styles.container}>
            <ScrollView>
                <View style = {{marginTop : 20}}>
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
                    <View style = {{flexDirection : 'row'}}>
                        <View style = {{flex : 1}}>
                            <Text  style = {styles.title_text}>Umur</Text>
                            <TextInput
                                value = {age}
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
                        value = {phone_number}
                        placeholder = "Masukan Nomor Telepon"
                        style = {styles.text_input}
                        onChangeText = {(e) => setPhone_Number(e)}
                        keyboardType = "number-pad"
                        ref = {(input) => inputPhoneNumber = input}
                        returnKeyType = "done"
                    />
                </View>
            </ScrollView>

            <View style = {styles.container_buttom}>
                <View style = {{width : '100%'}}>
                    <TouchableOpacity style = {styles.button_add} onPress = {() => handleAdd(name,age,religion,address,districts,phone_number,setName,setAge,setReligion,setAddress,setDistricts,setPhone_Number,Alert,navigation)}>
                        <Text style = {{textAlign : 'center'}}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MechaniceForm