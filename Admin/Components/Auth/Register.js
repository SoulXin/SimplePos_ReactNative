import React,{useState,useCallback} from 'react'
import { View, Text,TextInput,TouchableOpacity,Modal} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconForm from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect } from 'react-navigation-hooks'
import {checkUserSignedIn,handleRegister} from './Component/Function'
import styles from './Component/Style'
import Loading from '../Modal_Loading/Loading'

const Register = ({navigation}) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [nameError,setNameError] = useState(false);
    const [showPassword,setShowPassword] = useState(true);
    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [alreadyUser,setAlreadyUser] = useState(false);

    useFocusEffect(useCallback(() => {
        checkUserSignedIn();
        return () => {

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
                alreadyUser ? 
                <View style = {{alignItems : 'center'}}>
                    <View style = {styles.container_already}>
                        <View style = {{flex : 1}}>
                            <Text style = {{color : 'red'}}>Email Tidak Bisa Di Gunakan</Text>
                        </View>
                        <TouchableOpacity onPress = {() => setAlreadyUser(false)}>
                            <Icon name = "times" style = {{fontSize : 24}} color = "red"/>
                        </TouchableOpacity>
                    </View>
                </View> : null
            }
            {/* Form */}
            <View style = {styles.container_form}>
                <Text style = {styles.title_register}>Pendaftaran</Text>
                <View style = {nameError ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "account" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {nameError ? styles.text_input_error : styles.text_input}
                        placeholder = "Nama Pengguna"
                        onChangeText = {(e) => setName(e)}
                        value = {name}
                        returnKeyType = "next" 
                        onSubmitEditing = {() => inputEmail.focus()}
                    />
                </View>
                {/* Error For Name */}
                {
                    nameError ? <Text style = {styles.wrong_input}>Panjang Nama Harus Lebih Dari 3</Text> : null
                }
                <View style = {emailError ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "at" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {emailError ? styles.text_input_error : styles.text_input}
                        placeholder = "Email"
                        onChangeText = {(e) => setEmail(e)}
                        value = {email}
                        ref = {(input) => inputEmail = input}
                        returnKeyType = "next" 
                        onSubmitEditing = {() => inputPassword.focus()}
                    />
                </View>
                {/* Error For Email */}
                {
                    emailError ? <Text style = {styles.wrong_input}>Email Tidak Valid</Text> : null
                }

                <View style = {passwordError ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "lock" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {passwordError ?  styles.password_error : styles.password}
                        placeholder = "Password"
                        onChangeText = {(e) => setPassword(e)}
                        value = {password}
                        secureTextEntry={showPassword}
                        ref = {(input) => inputPassword = input}
                        returnKeyType = "next" 
                        onSubmitEditing = {() => inputRePassword.focus()}
                    />
                    <View style = {styles.show_password}>
                        <TouchableOpacity onPress = {() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <Icon name = "eye" style = {{fontSize : 24}}/> : <Icon name = "eye-slash" style = {{fontSize : 24}}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = {passwordError ? styles.container_error : styles.container_normal}>
                    <View style = {styles.icon}>
                        <IconForm name = "lock" style = {{fontSize : 24}}/>
                    </View>
                    <TextInput
                        style = {passwordError ? styles.password_error : styles.password}
                        placeholder = "Konfirmasi Password"
                        onChangeText = {(e) => setRePassword(e)}
                        value = {rePassword}
                        secureTextEntry={showPassword}
                        ref = {(input) => inputRePassword = input}
                        returnKeyType = "done"
                    />
                </View>
                {/* Error For Password */}
                {
                    passwordError ? <Text style = {styles.wrong_input}>Password dan Konfirmasi Password Harus Sama</Text> : null
                }

                {/* Button */}
                <View>
                    <TouchableOpacity 
                        style = {styles.button_submit}
                        onPress = {() => handleRegister(name,email,password,rePassword,setLoading,setNameError,setEmailError,setPasswordError,setAlreadyUser,navigation)}
                    >
                        <Text style = {styles.text_button}>Daftar</Text>
                    </TouchableOpacity>
                    <View style = {styles.container_direction}>
                        <Text style = {styles.title_question}>Sudah Punya Akun ? </Text>
                        <TouchableOpacity 
                            style = {styles.button_direction}
                            onPress = {() => navigation.navigate('Login')}
                        ><Text style = {styles.text_button}>Masuk Di Sini</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Register