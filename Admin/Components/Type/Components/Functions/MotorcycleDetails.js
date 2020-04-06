import axios from 'axios'

const handleUpdate = (id,name,category,year,Alert,navigation) => {
    const data = {
        name : name,
        category : category,
        year : year
    }
    if(name.length < 4){
        Alert.alert('Pemberitahuan','Nama Produk Harus Lebih Dari 3 Kata',[{text: 'OK'}]);
    }else if(!year){
        Alert.alert('Pemberitahuan','Tahun Kereta Tidak Boleh Kosong',[{text : 'OK'}])
    }else if(year >  new Date().getFullYear()){
        Alert.alert('Pemberitahuan',`Tahun Keluaran Kereta Tidak Bisa Lebih Besar Dari Tahun Sekarang ${new Date().getFullYear()}`,[{text: 'OK'}]);
    }else{
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/motorcycle/update_motorcycle/${id}`,
            data : data
        })
        .then(response => {
            Alert.alert('Berhasil','Pembaharuan Data Telah Berhasil',[{text: 'OK', onPress: () => navigation.navigate('MotorcycleList')}]);
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const handleDelete = (id,Alert,navigation) => {
    axios({
        method : 'DELETE',
        url : `http://192.168.43.171:5000/motorcycle/delete_motorcycle/${id}`
    })
    .then(response => {
        Alert.alert('Pemberitahuan','Tipe Kereta Berhasil Di Hapus',[{text : 'OK', onPress : () => navigation.navigate('MotorcycleList')}])
    })
    .catch(error => {
        console.log(error)
    })
}

export {
    handleUpdate,
    handleDelete
}