import axios from 'axios'

const handleSubmit = (name,year,Alert,category,navigation) => {
    if(name.length < 4){
        Alert.alert('Pemberitahuan','Panjang Nama Produk harus Lebih Besar Dari 3',[{text : 'OK'}])
    }else if(!year){
        Alert.alert('Pemberitahuan','Tahun Kereta Tidak Boleh Kosong',[{text : 'OK'}])
    }else if( year > new Date().getFullYear()){
        Alert.alert('Pemberitahuan',`Tahun Keluaran Kereta Tidak Bisa Lebih Besar Dari Tahun Sekarang ${new Date().getFullYear()}`,[{text: 'OK'}]);
    }else{
        const data = {
            name : name,
            category : category,
            year : year
        }
        axios({
            method : 'POST',
            url : `http://192.168.43.171:5000/motorcycle/add_motorcycle`,
            data : data
        })
        .then(response => {
            Alert.alert('Pemberitahuan','Jenis Kereta Telah Berhasil Di Tambahkan',[{text: 'OK', onPress: () => navigation.navigate('MotorcycleList')},]);
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export {
    handleSubmit
}