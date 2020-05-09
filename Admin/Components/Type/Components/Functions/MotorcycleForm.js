import axios from 'axios'
import {clear_AsyncStorage} from '../../../../Global_Functions/Functions'

const handleSubmit = (name,year,Alert,category,navigation,checkUserSignedIn,setLoading) => {
    setLoading(true);
    if(name.length < 4){
        setLoading(false);
        Alert.alert('Pemberitahuan','Panjang Nama Produk harus Lebih Besar Dari 3',[{text : 'OK'}])
    }else if(!year){
        setLoading(false);
        Alert.alert('Pemberitahuan','Tahun Kereta Tidak Boleh Kosong',[{text : 'OK'}])
    }else if( year > new Date().getFullYear()){
        setLoading(false);
        Alert.alert('Pemberitahuan',`Tahun Keluaran Kereta Tidak Bisa Lebih Besar Dari Tahun Sekarang ${new Date().getFullYear()}`,[{text: 'OK'}]);
    }else{
        checkUserSignedIn(navigation)
        .then(res => {
            const data = {
                user_id : res.user._id,
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
                setLoading(false);
                Alert.alert('Pemberitahuan','Jenis Kereta Telah Berhasil Di Tambahkan',[{text: 'OK', onPress: () => navigation.navigate('MotorcycleList')},]);
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
            })
        })
        .catch(err => {
            setLoading(false);
            clear_AsyncStorage(navigation);
        })
    }
}

export {
    handleSubmit
}