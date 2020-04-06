import axios from 'axios'
import {removeFormatMoney} from '../../../../Global_Functions/Functions'

const handleSubmit = (name,capital,price,selectionType,qty,Alert,navigation) => {
    const data = {
        product_name : name,
        product_capital : removeFormatMoney(capital),
        product_price : removeFormatMoney(price),
        product_type : selectionType,
        qty : qty
    }

    if(name.length < 4){
        Alert.alert('Pemberitahuan','Panjang Nama Produk harus Lebih Besar Dari 3',[{text : 'OK'}])
    }else if(capital < 1){
        Alert.alert('Pemberitahuan','Modal Barang Tidak Boleh Nol Atau Minus',[{text : 'OK'}])
    }else if(removeFormatMoney(capital) > removeFormatMoney(price)){
        Alert.alert('Pemberitahuan','Modal Barang Tidak Boleh Lebih Besar Dari Nilai Jual',[{text : 'OK'}])
    }else if(selectionType.length < 1){
        Alert.alert('Pemberitahuan','Pilih Salah Satu Jenis Kereta',[{text : 'OK'}])
    }else{
        axios({
            method : 'POST',
            url : `http://192.168.43.171:5000/product/add_product`,
            data : data
        })
        .then(response => {
            console.log(response.data)
            Alert.alert('Pemberitahuan','Produk Berhasil Di Tambahkan',[{text : 'OK',onPress : () => navigation.navigate('ProductList')}])
        })
        .catch(error => {
            console.log(error)
        })
    }
}

const handleAddSelectionType = (id,list,dataType,tempDataType,setDataType,setTempDataType,setSelectionType,setTempSelectionType) => {
    let temp_Data = dataType.filter(list => list._id !== id);
    let temp_Selection = tempDataType.filter(list => list._id !== id);
    setDataType(temp_Data);
    setTempDataType(temp_Selection);
    setSelectionType(old => [...old,list]);
    setTempSelectionType(old => [...old,list]);
}

const handleRemoveSelectionType = (id,list,selectionType,tempSelectionType,setSelectionType,setTempSelectionType,setDataType,setTempDataType) => {
    let temp_Data = selectionType.filter(list => list._id !== id);
    let temp_Selection = tempSelectionType.filter(list => list._id !== id);
    setSelectionType(temp_Data);
    setTempSelectionType(temp_Selection);
    setDataType(old => [...old,list]);
    setTempDataType(old => [...old,list]);
}

const handleFilterDataType = (value,tempDataType,setFilterType,setDataType) => {
    setFilterType(value);
    if(value !== "All"){
        const filter_type =  tempDataType.filter(list => list.category === value);
        setDataType(filter_type);
    }else{
        setDataType(tempDataType);
    }
}

const handleFilterSelectionType = (value,tempSelectionType,setFilterSelectionType,setSelectionType) => {
    setFilterSelectionType(value);
    if(value !== "All"){
        const filter_type =   tempSelectionType.filter(list => list.category === value);
        setSelectionType(filter_type);
    }else{
        setSelectionType(tempSelectionType);
    }
}

const handleCloseModalShow = (setModalShow,setFilterType,setFilterSelectionType) => {
    setModalShow(false);
    setFilterType("All");
    setFilterSelectionType("All");
}

export { 
    handleSubmit,
    handleAddSelectionType,
    handleRemoveSelectionType,
    handleFilterDataType,
    handleFilterSelectionType,
    handleCloseModalShow
}