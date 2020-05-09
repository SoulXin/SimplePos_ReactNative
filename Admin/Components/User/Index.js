import React,{useState,useCallback} from 'react'
import { View, Text,TouchableOpacity, TextInput,ScrollView,Linking,Modal } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './Component/Style'
import {checkUserSignedIn,clear_AsyncStorage} from '../../Global_Functions/Functions'
import { handleLogout,handleChangePassword,handleChangeName } from './Component/Function'
import Loading from '../Modal_Loading/Loading'

const Index = ({navigation}) => {
    const [token,setToken] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [showPassword,setShowPassword] = useState(true);
    const [changeName,setChangeName] = useState(false);
    const [notification,setNotitication] = useState('');
    const [loading,setLoading] = useState(false);
    const [successChange,setSuccessChange] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        checkUserSignedIn(navigation)
        .then(res => {
            setToken(res.token);
            setName(res.user.name);
            setEmail(res.user.email);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            clear_AsyncStorage(navigation);
        })
        return () => {
            setToken('');
            setName('');
            setEmail('');
            setOldPassword('');
            setNewPassword('');
            setRePassword('');
            setShowPassword(false);
            setNotitication('');
        }
    },[]));

    return (
            <ScrollView>
                <Loading loading = {loading}/>
                <Modal visible = {notification.length ? true : false} transparent>
                    <View style = {styles.container_loading}>
                        <View style = {successChange ? styles.success_change : styles.error_change}>
                            <View style = {{position : 'absolute',top : 10,right : 10}}>
                                <TouchableOpacity onPress = {() => setNotitication('')}>
                                    <Icon name = "times-circle" style = {{fontSize : 24}} color = "white"/>
                                </TouchableOpacity>
                            </View>
                            <Text style = {styles.loading_text}>{notification}</Text>
                        </View>
                    </View>
                </Modal>

                <View style = {styles.container}>
                        {/* Header */}
                        <Text style = {styles.title_header}>Informasi Akun</Text>

                        {/* Name */}
                        <Text style = {styles.title_name}>Nama Toko</Text>
                        <View style = {changeName ? styles.active_change : {flexDirection : 'row'}}>
                            <TextInput
                                value = {name}
                                onChangeText = {changeName ? (e) => setName(e) : null}
                                style = {styles.input_name}
                            />
                            <View  style = {{padding : 10}}>
                                <TouchableOpacity onPress = {() => setChangeName(true)}>
                                    {
                                        changeName ? 
                                        <Icon name = "check" style = {{fontSize : 24}} onPress = {() => handleChangeName(name,email,checkUserSignedIn,setChangeName,setLoading,navigation)} /> : 
                                        <Icon name = "edit" style = {{fontSize : 24}} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Email */}
                        <Text style = {styles.title}>Email</Text>
                        <Text style = {styles.email}>{email}</Text>
                        
                        <View style = {styles.container_change_password}>
                            <Text style = {styles.title_change_password}>Ubah Password</Text>
                            {/* OldPassword */}
                            <Text style = {styles.title}>Password Lama</Text>
                            <View style = {styles.container_old_password}>
                                <TextInput
                                    value = {oldPassword}
                                    onChangeText = {(e) => setOldPassword(e)}
                                    style = {styles.input_old_password}
                                    secureTextEntry={showPassword}
                                    returnKeyType = "next"
                                    onSubmitEditing = {() => inputPassword.focus()}
                                />
                                <View  style = {{padding : 10}}>
                                    <TouchableOpacity onPress = {() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <Icon name = "eye" style = {{fontSize : 24}}/> : <Icon name = "eye-slash" style = {{fontSize : 24}}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Password */}
                            <Text style = {styles.title}>Password Baru</Text>
                            <TextInput
                                value = {newPassword}
                                onChangeText = {(e) => setNewPassword(e)}
                                style = {styles.input_password}
                                secureTextEntry={showPassword}
                                ref = {(input) => inputPassword = input}
                                returnKeyType = "next"
                                onSubmitEditing = {() => inputRePassword.focus()}
                            />

                            {/* Re Password */}
                            <Text style = {styles.title}>Konfirmasi Password Baru</Text>
                            <TextInput
                                value = {rePassword}
                                onChangeText = {(e) => setRePassword(e)}
                                style = {styles.input_password}
                                secureTextEntry={showPassword}
                                ref = {(input) => inputRePassword = input}
                                returnKeyType = "done"
                            />

                            <TouchableOpacity 
                                style = {styles.button_change}
                                onPress = {() => handleChangePassword(newPassword,rePassword,oldPassword,email,setShowPassword,setOldPassword,setNewPassword,setRePassword,setNotitication,setLoading,setSuccessChange)}
                            >
                                <Text style = {styles.text_button}>Ubah</Text>
                            </TouchableOpacity>
                        </View>
                    <TouchableOpacity 
                        style = {styles.button_logout}
                        onPress = {() => handleLogout(token,navigation,setLoading)}
                    >
                        <Text style = {styles.text_button}>Logout</Text>
                    </TouchableOpacity>

                    <View style = {styles.container_medsos}>
                        <TouchableOpacity onPress = {() => Linking.openURL('https://github.com/SoulXin')}>
                            <View style = {styles.button_sosmed}>
                                <Icon name = "github-square" size = {45} color = "white"/>
                                <Text style = {styles.text_sosmed}>Github</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => Linking.openURL('https://wa.me/6285362023957')}>
                            <View style = {styles.button_sosmed}>
                                <Icon name = "whatsapp-square" size = {45} color = "white"/>
                                <Text style = {styles.text_sosmed}>Whatsapp</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
    )
}

export default Index