import React,{useState,useEffect} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert } from 'react-native'
import axios from 'axios'

const MotorcycleForm = ({navigation}) => {
    const [name,setName] = useState('');
    const [year,setYear] = useState('');
    const [category,setCategory] = useState('Honda');

    const handleSubmit = () => {
        if(name.length < 4){
            Alert.alert('Pemberitahuan','Panjang Nama Produk harus Lebih Besar Dari 3',[{text : 'OK'}])
        }else if(!year){
            Alert.alert('Pemberitahuan','Tahun Kereta Tidak Boleh Kosong',[{text : 'OK'}])
        }else if( year > new Date().getFullYear()){
            Alert.alert('Pemberitahuan',`Tahun Keluaran Kereta Tidak Bisa Lebih Besar Dari Tahun Sekarang ${new Date().getFullYear()}`,[{text: 'OK'}]);
        }else{
            const data = {
                name : name,
                category : category,
                year : year
            }
            axios({
                method : 'POST',
                url : `http://192.168.43.171:5000/motorcycle/add_motorcycle`,
                data : data
            })
            .then(response => {
                Alert.alert('Pemberitahuan','Jenis Kereta Telah Berhasil Di Tambahkan',[{text: 'OK', onPress: () => navigation.navigate('MotorcycleList')},]);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <View style = {{flex : 1,margin : 10}}>
            <Text style = {{fontSize : 20,fontWeight : 'bold',textAlign : 'center'}}>Form Tambah Jenis Kereta Baru</Text>
            {/* Nama Kereta */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {{marginTop : 20}}>
                    <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Nama Kereta</Text>
                    <TextInput
                        placeholder = "Masukan Nama Kereta"
                        style = {{borderBottomWidth : 1,fontSize : 16}}
                        onChangeText = {(e) => setName(e)}
                    />
                </View>
            </TouchableWithoutFeedback>

            <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center',marginTop : 20}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1}}>
                        <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Kategory Kereta</Text>
                        <Picker
                            selectedValue = {category}
                            onValueChange = {(value) => setCategory(value)}
                        >
                            <Picker.Item label = "Honda" value = {"Honda"} />
                            <Picker.Item label = "Yamaha" value = {"Yamaha"} />
                            <Picker.item label = "Lain - Lain" value = {"Lain - Lain"}/>
                        </Picker>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1}}>
                        <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Tahun Keluaran</Text>
                        <TextInput
                            style = {{borderBottomWidth : 2,fontSize : 16,textAlign : 'center'}}
                            placeholder = "2010"
                            onChangeText = {(e) => setYear(e)}
                            keyboardType = "numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style = {{flexDirection : 'row',justifyContent : 'center',alignItems : 'center',marginTop : 20}}>
                <TouchableOpacity  style = {{backgroundColor : '#cbf1f5',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {() => navigation.navigate('MotorcycleList')}>
                    <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {handleSubmit}>
                    <Text style = {{textAlign : 'center',fontSize : 14}}>Tambah Kereta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MotorcycleForm
