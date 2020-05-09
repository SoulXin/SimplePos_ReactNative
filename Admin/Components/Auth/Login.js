import React,{useState,useCallback} from 'react'
import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconForm from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from 'react-navigation-hooks'
import styles from './Component/Style'
import {checkUserSignedIn,checkSuccessRegister,AsyncStorage_RemoveItem,handleSubmit} from './Component/Function'
import Loading from '../Modal_Loading/Loading'

const Login = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword,setShowPassword] = useState(true);
    const [emailError,setEmailError] = useState(false);
    const [wrong,setWrong] = useState(false);
    const [loading,setLoading] = useState(false);
    const [successRegister,setSuccessRegister] = useState(false);

     useFocusEffect(useCallback(() => {
        checkUserSignedIn(navigation);
        checkSuccessRegister(setSuccessRegister);
        return () => {
            setEmail('');
            setPassword('');
            setShowPassword(true);
            setWrong(false);
            setEmailError(false);
            setLoading(false);
        }
    },[]));


    return (
        <View style = {styles.container}>
            <Loading loading = {loading}/>
            {/* Logo */}
            <View style = {{alignItems : 'center'}}>
                <Icon name = "money-bill-wave" style = {{fontSize : 34}}/>
                <Text style = {styles.logo_text}>My Financial</Text>
            </View>
            {
                successRegister ? 
                <View style = {{alignItems : 'center'}}>
                    <View style = {styles.container_success_register}>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'green'}}>Pendaftaran Berhasil,..!</Text>
                        </View>
                        <TouchableOpacity onPress = {() => AsyncStorage_RemoveItem(setSuccessRegister)}>
                            <Icon name = "times" style = {{fontSize : 24}} color = "green"/>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
            {/* Form */}
            <View style = {styles.container_form}>
                <View style = {emailError || wrong ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "at" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {emailError || wrong ? styles.text_input_error : styles.text_input}
                        placeholder = "Email"
                        onChangeText = {(e) => setEmail (e)}
                        value = {email}
                        returnKeyType = "next" 
                        onSubmitEditing = {() => inputPassword.focus()}

                    />
                </View>
                {
                    emailError ? <Text style = {styles.wrong_input}>Email Tidak Valid</Text> : null
                }
                
                <View style = {wrong ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "lock" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {wrong ? styles.password_error : styles.password}
                        placeholder = "Password"
                        onChangeText = {(e) => setPassword(e)}
                        value = {password}
                        secureTextEntry={showPassword}
                        returnKeyType = "done"
                        ref = {(input) => inputPassword = input}

                    />
                    <View style = {styles.show_password}>
                        <TouchableOpacity onPress = {() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <Icon name = "eye" style = {{fontSize : 24}}/> : <Icon name = "eye-slash" style = {{fontSize : 24}}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    wrong ? <Text style = {styles.wrong_input}>Email Atau Password Salah</Text> : null
                }
                {/* Button */}
                <View>
                    <TouchableOpacity 
                        style = {styles.button_submit}
                        onPress = {() => handleSubmit(email,password,setLoading,setEmailError,setWrong,navigation)}
                    >
                        <Text style = {styles.text_button}>Masuk</Text>
                    </TouchableOpacity>

                    <View style = {styles.container_direction}>
                        <Text style = {styles.title_question}>Belum Punya Akun ? </Text>
                        <TouchableOpacity 
                            style = {styles.button_direction}
                            onPress = {() => navigation.navigate('Register')}
                        ><Text style = {styles.text_button}>Daftar Di Sini</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login