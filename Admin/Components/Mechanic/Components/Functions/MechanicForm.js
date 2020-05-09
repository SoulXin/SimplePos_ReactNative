import axios from 'axios'

const handleAdd = (user_id,name,age,religion,address,districts,phone_number,setName,setAge,setReligion,setAddress,setDistricts,setPhone_Number,setLoading,Alert,navigation) => {
    setLoading(true);
    const data = {
        user_id : user_id,
        name : name,
        age : parseInt(age),
        religion : religion,
        address : address,
        districts : districts,
        phone_number : parseInt(phone_number)
    }

    axios({
        method : 'POST',
        url : `http://192.168.43.171:5000/employee/add_employee`,
        data : data
    })
    .then(response => {
        setName('');
        setAge('');
        setReligion('Islam');
        setAddress('');
        setDistricts('');
        setPhone_Number('');
        setLoading(false);
        Alert.alert('Pemberitahuan','Mekanik Berhasil Di Tambahkan',[{text : 'OK', onPress : () => navigation.navigate('MechaniceList')}]);
    })
    .catch(error => {
        setLoading(false);
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
}

export {
    handleAdd
}