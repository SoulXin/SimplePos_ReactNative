import { AsyncStorage } from 'react-native'
import axios from 'axios'

const checkUserSignedIn = async (navigation) =>{
    try {
       let value = await AsyncStorage.getItem('data_login');
       if (value != null){
        // do something
        navigation.navigate('Home')
       }
    } catch (error) {
      // Error retrieving data
      return error
    }
}

const checkSuccessRegister = async (setSuccessRegister) => {
    try {
        let value = await AsyncStorage.getItem('success');
        if (value != null){
         // do something
         setSuccessRegister(true);
        }
     } catch (error) {
       // Error retrieving data
       return error
     }
}

const AsyncStorage_SetItem = async (data) => {
    try{
        await AsyncStorage.setItem('data_login',JSON.stringify(data));
    }
    catch (error){
        console.log(error);
    }
}

const AsyncStorage_RemoveItem = async (setSuccessRegister) => {
    try{
        await AsyncStorage.removeItem('success');
        return setSuccessRegister(false);
    }catch(error){
        console.log(error)
    }
}

const handleSubmit = (
    email,
    password,
    setLoading,
    setEmailError,
    setWrong,
    navigation
) => {
    setLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Check Email & Password Length True
    if(email.length && password.length){
        // Email Validation
        if(reg.test(email) !== false){
            setEmailError(false);
            const data = {
                email : email,
                password : password
            }
            axios({
                method : 'POST',
                url : 'http://192.168.43.171:5000/user/login_user',
                data : data
            })
            .then(response => {
                AsyncStorage_SetItem(response.data);
                navigation.navigate('Home')
            })
            .catch(error => {
                setLoading(false);
                setWrong(true);
            })
        }else{
            setLoading(false);
            setEmailError(true);
            setWrong(false);
        }
    }else{
        setLoading(false);
        setWrong(true);
    }
}


const handleRegister = (
    name,
    email,
    password,
    rePassword,
    setLoading,
    setNameError,
    setEmailError,
    setPasswordError,
    setAlreadyUser,
    navigation
) => {
    setLoading(true);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // Check Name
    if(name.length >= 3){
        setNameError(false);

        // Check Email
        if(reg.test(email) !== false){
            setEmailError(false);

            // Check Password
            if(password === rePassword && password.length && rePassword.length){
                setPasswordError(false);
                const data = {
                    name : name,
                    email : email,
                    password : password
                }
                axios({
                    method : 'POST',
                    url : 'http://192.168.43.171:5000/user/register_user',
                    data : data
                })
                .then(response => {
                    AsyncStorage.setItem('success','success');
                    navigation.navigate('Login')
                })
                .catch(error => {
                    setLoading(false);
                    setAlreadyUser(true);
                })
            }else{
                setLoading(false);
                setPasswordError(true);
            }
        }else{
            setLoading(false);
            setEmailError(true);
        }
    }else{
        setLoading(false);
        setNameError(true);
    }
}


export {
    checkUserSignedIn,
    checkSuccessRegister,
    AsyncStorage_RemoveItem,
    handleSubmit,
    handleRegister
}