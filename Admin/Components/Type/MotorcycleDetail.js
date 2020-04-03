import React,{useState,useCallback} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import axios from 'axios'

const MotorcycleDetail = ({navigation}) => {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [year,setYear] = useState('');
    const [category,setCategory] = useState('Honda');

    useFocusEffect(useCallback(() => {
        setId(navigation.state.params._id);
        setName(navigation.state.params.name);
        setYear(navigation.state.params.year.toString());
        setCategory(navigation.state.params.category);

        return () => {
            
        }
    },[]));

    const handleUpdate = () => {
        console.log(year,new Date().getFullYear());
        const data = {
            name : name,
            category : category,
            year : year
        }
        if(name.length < 4){
            Alert.alert('Pemberitahuan','Nama Produk Harus Lebih Dari 3 Kata',[{text: 'OK'}]);
        }else if(!year){
            Alert.alert('Pemberitahuan','Tahun Kereta Tidak Boleh Kosong',[{text : 'OK'}])
        }else if(year >  new Date().getFullYear()){
            Alert.alert('Pemberitahuan',`Tahun Keluaran Kereta Tidak Bisa Lebih Besar Dari Tahun Sekarang ${new Date().getFullYear()}`,[{text: 'OK'}]);
        }else{
            axios({
                method : 'PUT',
                url : `http://192.168.43.171:5000/motorcycle/update_motorcycle/${id}`,
                data : data
            })
            .then(response => {
                Alert.alert('Berhasil','Pembaharuan Data Telah Berhasil',[{text: 'OK', onPress: () => navigation.navigate('MotorcycleList')}]);
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const handleDelete = () => {
        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/motorcycle/delete_motorcycle/${id}`
        })
        .then(response => {
            Alert.alert('Pemberitahuan','Tipe Kereta Berhasil Di Hapus',[{text : 'OK', onPress : () => navigation.navigate('MotorcycleList')}])
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <View style = {{flex : 1,margin : 10}}>
            <Text style = {{fontSize : 20,fontWeight : 'bold',textAlign : 'center'}}>Form Detail Kereta</Text>
            {/* Nama Kereta */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {{marginTop : 20}}>
                    <Text  style = {{fontWeight : 'bold',fontSize : 16}}>Nama Kereta</Text>
                    <TextInput
                        value = {name}
                        style = {{borderBottomWidth : 2,fontSize : 16}}
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
                            value = {year}
                            style = {{borderBottomWidth : 2,fontSize : 16,textAlign : 'center'}}
                            onChangeText = {(e) => setYear(e)}
                            // keyboardType = "numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* Button */}
            <View style = {{flexDirection: 'column',width : '100%',justifyContent : 'center',alignItems : 'center',position : 'absolute',bottom : 0}}>
                <View style = {{flex : 1,width : '100%'}}>
                    <TouchableOpacity style = {{backgroundColor : '#ffb0cd',padding : 10,margin : 10,borderRadius : 10,alignItems : 'center'}} onPress = {() => handleDelete()}>
                        <Text style = {{fontSize : 14}}>Hapus Tipe Kereta</Text>
                    </TouchableOpacity>
                </View>
                
                <View style = {{flexDirection : 'row',flex : 1}}>
                    <TouchableOpacity  style = {{backgroundColor : '#cbf1f5',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {() => navigation.navigate('MotorcycleList')}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Kembali</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{backgroundColor : '#61c0bf',padding : 10,margin : 10,flex : 1,borderRadius : 10}} onPress = {() => handleUpdate()}>
                        <Text style = {{textAlign : 'center',fontSize : 14}}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MotorcycleDetail