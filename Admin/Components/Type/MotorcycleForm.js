import React,{useState} from 'react'
import { View, Text,Picker, TextInput,TouchableWithoutFeedback,Keyboard,TouchableOpacity,Alert } from 'react-native'
import { handleSubmit } from './Components/Functions/MotorcycleForm'
import styles from './Components/Styles/MotorcycleForm'

const MotorcycleForm = ({navigation}) => {
    const [name,setName] = useState('');
    const [year,setYear] = useState('');
    const [category,setCategory] = useState('Honda');

    return (
        <View style = {styles.container}>
            <Text style = {styles.title_text}>Form Tambah Jenis Kereta Baru</Text>
            {/* Nama Kereta */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {{marginTop : 20}}>
                    <Text  style = {styles.second_title_text}>Nama Kereta</Text>
                    <TextInput
                        placeholder = "Masukan Nama Kereta"
                        style = {styles.text_input_name}
                        onChangeText = {(e) => setName(e)}
                    />
                </View>
            </TouchableWithoutFeedback>

            <View style = {styles.row}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{flex : 1}}>
                        <Text  style = {styles.second_title_text}>Kategory Kereta</Text>
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
                        <Text  style = {styles.second_title_text}>Tahun Keluaran</Text>
                        <TextInput
                            style = {styles.text_input_year}
                            placeholder = "2010"
                            onChangeText = {(e) => setYear(e)}
                            keyboardType = "numeric"
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style = {styles.row_bottom}>
                <TouchableOpacity style = {styles.button_add} onPress = {() => handleSubmit(name,year,Alert,category,navigation)}>
                    <Text style = {{textAlign : 'center',fontSize : 14}}>Tambah Kereta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MotorcycleForm