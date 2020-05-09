import axios from 'axios'
import {removeFormatMoney} from '../../../../Global_Functions/Functions'

const handleAddSelectionType = (id,list,type,tempType,setSelectionType,setTempSelectionType,setType,setTempType) => {
    let temp_Data = type.filter(list => list._id !== id);
    let temp_Selection = tempType.filter(list => list._id !== id);
    setSelectionType(old => [...old,list]);
    setTempSelectionType(old => [...old,list]);
    setType(temp_Data)
    setTempType(temp_Selection);
}

const handleRemoveSelectionType = (id,list,selectionType,tempSelectionType,setType,setTempType,setSelectionType,setTempSelectionType) => {
    let temp_Data = selectionType.filter(list => list._id !== id);
    let temp_Selection = tempSelectionType.filter(list => list._id !== id);
    setType(old => [...old,list]);
    setTempType(old => [...old,list]);
    setSelectionType(temp_Data);
    setTempSelectionType(temp_Selection);
}

const handleUpdate = (id,name,capital,price,tempSelectionType,qty,Alert,navigation,setLoading) => {
    setLoading(true);
    const data = {
        product_name : name,
        product_capital : removeFormatMoney(capital),
        product_price : removeFormatMoney(price),
        product_type : tempSelectionType,
        qty : parseInt(qty)
    };
    if(name.length < 4){
        setLoading(false);
        Alert.alert('Pemberitahuan','Nama Produk Harus Lebih Dari 3 Kata',[{text: 'OK'}]);
    }else if(removeFormatMoney(capital) > removeFormatMoney(price)){
        setLoading(false);
        Alert.alert('Pemberitahuan','Modal Tidak Boleh Lebih Besar Dari Harga Jual',[{text: 'OK'}]);
    }else if(capital < 1){
        setLoading(false);
        Alert.alert('Pemberitahuan','Modal Tidak Boleh 0',[{text: 'OK'}]);
    }else if(tempSelectionType.length < 1){
        setLoading(false);
        Alert.alert('Pemberitahuan','Jumlah Tipe Kereta Tidak Boleh Kosong',[{text: 'OK'}]);
    }else{
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/product/update_product/${id}`,
            data : data
        })
        .then(response => {
            setLoading(false);
            Alert.alert('Berhasil','Pembaharuan Data Telah Berhasil',[{text: 'OK', onPress: () => navigation.navigate('ProductList')}]);
        })
        .catch(error => {
            setLoading(false);
            Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
        })
    }
}

const handleDelete = (id,Alert,navigation,setLoading) => {
    setLoading(true);
    axios({
        method : 'DELETE',
        url : `http://192.168.43.171:5000/product/delete_product/${id}`
    })
    .then(response => {
        setLoading(false);
        Alert.alert('Pemberitahuan','Produk Berhasil Di Hapus',[{text : 'OK', onPress : () => navigation.navigate('ProductList')}])
    })
    .catch(error => {
        setLoading(false);
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
}

const handleFilterType = (value,tempType,setFilterType,setType) => {
    setFilterType(value);
    if(value !== "All"){
        const filter_type = tempType.filter(list => list.category === value);
        setType(filter_type);
    }else{
        setType(tempType)
    }
}

const handleSelectedFilterType = (value,tempSelectionType,setSelectionFilterType,setSelectionType) => {
    setSelectionFilterType(value);
    if(value !== "All"){
        const filter_selection_type =  tempSelectionType.filter(list => list.category === value);
        setSelectionType(filter_selection_type);
    }else{
        setSelectionType(tempSelectionType);
    }
}

const handleCloseModalShow = (tempType,tempSelectionType,type,selectionType,setModalShow,setFilterType,setSelectionFilterType,setType,setSelectionType) => {
    setModalShow(false);
    setFilterType("All");
    setSelectionFilterType("All");

    if(tempType.length !== type.length){
        setType(tempType)
    }

    if(tempSelectionType.length !== selectionType.length){
        setSelectionType(tempSelectionType)
    }
}

export {
    handleAddSelectionType,
    handleRemoveSelectionType,
    handleUpdate,
    handleDelete,
    handleFilterType,
    handleSelectedFilterType,
    handleCloseModalShow
}