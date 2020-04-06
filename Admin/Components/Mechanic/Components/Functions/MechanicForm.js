import axios from 'axios'

const handleAdd = (name,age,religion,address,districts,phone_number,setName,setAge,setReligion,setAddress,setDistricts,setPhone_Number,Alert,navigation) => {
    const data = {
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
        Alert.alert('Pemberitahuan','Mekanik Berhasil Di Tambahkan',[{text : 'OK', onPress : () => navigation.navigate('MechaniceList')}]);
    })
    .catch(error => {
        console.log(error)
    })
}

export {
    handleAdd
}