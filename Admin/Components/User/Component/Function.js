import {AsyncStorage,Alert} from 'react-native'
import axios from 'axios'

const clear_AsyncStorage = async (navigation) => {
    try {
        await AsyncStorage.removeItem('data_login');
        navigation.navigate('Login');
        // return true;
    }
    catch(exception) {
        return false;
    }
}

const AsyncStorage_SetItem = async (data) => {
    try{
        await AsyncStorage.setItem('data_login',JSON.stringify(data));
    }
    catch (error){
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Storage,Silakan Hubungi Admin',[{text : 'OK'}]);
    }
}

const handleLogout = (token,navigation,setLoading) => {
    setLoading(true);
    axios({
        method : 'POST',
        url : 'http://192.168.43.171:5000/user/logout',
        headers: { Authorization : `Bearer ${token}` }
    })
    .then(response => {
        clear_AsyncStorage(navigation);
    })
    .catch(error => {
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
}

const handleChangePassword = (
    newPassword,
    rePassword,
    oldPassword,
    email,
    setShowPassword,
    setOldPassword,
    setNewPassword,
    setRePassword,
    setNotitication,
    setLoading,
    setSuccessChange
) => {
    setLoading(true);
    if(newPassword.length && rePassword.length && oldPassword.length){
        if(newPassword === rePassword){
            const data = {
                email : email,
                password : oldPassword,
                new_password : newPassword
            }

            axios({
                method : 'PUT',
                url : `http://192.168.43.171:5000/user/change_password`,
                data : data
            })
            .then(response => {
                setLoading(false);
                setSuccessChange(true);
                setShowPassword(false);
                setOldPassword('');
                setNewPassword('');
                setRePassword('');
                setNotitication('Password Berhasil Di Ubah');
            })
            .catch(error => {
                setLoading(false);
                setNotitication("Password Lama Tidak Benar");
            })
        }else{
            setLoading(false);
            setNotitication("password dan konfirmasi password harus sama");
        }
    }else{
        setLoading(false);
        setNotitication("Inputan Tidak Boleh Kosong");
    }
}

const handleChangeName = (
    name,
    email,
    checkUserSignedIn,
    setChangeName,
    setLoading,
    navigation
) => {
    setLoading(true);
    if(name.length){
        const data = {
            email : email,
            name : name
        }
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/user/change_name`,
            data : data
        })
        .then(response => {
            setChangeName(false);
            checkUserSignedIn(navigation)
            .then(res => {
                const data = {
                    token : res.token,
                    user : {
                        _id : res.user._id,
                        name : name,
                        email : res.user.email,
                        password : res.user.password
                    }
                }
                AsyncStorage_SetItem(data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                Alert.alert('Pemberitahuan','Terjadi Masalah Pada Storage,Silakan Hubungi Admin',[{text : 'OK'}]);
            })
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
        })
    }else{
        setLoading(false);
        Alert.alert('Pemberitahuan','Nama Tidak Boleh Kosong',[{text : 'Ok'}])
    }
}

export {
    handleLogout,
    handleChangePassword,
    handleChangeName,
    clear_AsyncStorage
}