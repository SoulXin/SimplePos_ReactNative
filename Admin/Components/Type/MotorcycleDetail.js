import React,{useState,useCallback} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import { handleUpdate,handleDelete } from './Components/Functions/MotorcycleDetails'
import styles from './Components/Styles/MotorcycleDetail'
import Loading from '../Modal_Loading/Loading'

const MotorcycleDetail = ({navigation}) => {
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [year,setYear] = useState('');
    const [category,setCategory] = useState('Honda');
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setId(navigation.state.params._id);
        setName(navigation.state.params.name);
        setYear(navigation.state.params.year.toString());
        setCategory(navigation.state.params.category);

        return () => {
            
        }
    },[]));

    return (
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            <Text style = {styles.title}>Form Detail Kereta</Text>
            {/* Nama Kereta */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {{marginTop : 20}}>
                    <Text  style = {styles.second_title}>Nama Kereta</Text>
                    <TextInput
                        value = {name}
                        style = {styles.text_input}
                        onChangeText = {(e) => setName(e)}
                    />
                </View>
            </TouchableWithoutFeedback>

            <View style = {styles.row}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1}}>
                        <Text  style = {styles.second_title}>Kategory Kereta</Text>
                        <Picker
                            selectedValue = {category}
                            onValueChange = {(value) => setCategory(value)}
                        >
                            <Picker label = "Honda" value = {"Honda"} />
                            <Picker label = "Yamaha" value = {"Yamaha"} />
                            <Picker label = "Lain - Lain" value = {"Lain - Lain"}/>
                        </Picker>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1}}>
                        <Text  style = {styles.second_title}>Tahun Keluaran</Text>
                        <TextInput
                            value = {year}
                            style = {styles.text_input}
                            onChangeText = {(e) => setYear(e)}
                            // keyboardType = "numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* Button */}
            <View style = {styles.container_button}> 
                <View style = {styles.row}>
                    <TouchableOpacity  style = {styles.button_delete} onPress = {() => handleDelete(id,Alert,navigation,setLoading)}>
                        <Text style = {styles.button_text}>Hapus Tipe Kereta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.button_update} onPress = {() => handleUpdate(id,name,category,year,Alert,navigation,setLoading)}>
                        <Text style = {styles.button_text}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MotorcycleDetail