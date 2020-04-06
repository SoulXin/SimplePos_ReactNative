import axios from 'axios'

const handleShowModalUpdate = (item,setShowModalUpdate,setTemp_Detail,setQty) => {
    setShowModalUpdate(true);
    setTemp_Detail(item);
    setQty(item.qty);
}

const handleUpdate = (qty,temp_detail,data,setShowModalUpdate,setData) => {
    setShowModalUpdate(false);
    const data_qty = {
        qty : parseInt(qty)
    }
    if(qty < temp_detail.qty){
        Alert.alert('Pemberitahuan','Jumlah Produk Tidak Boleh Lebih Kecil Dari Jumlah Sekarang',[{text : 'OK'}]);
    }else{
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/inventory/update_inventory/${temp_detail._id}`,
            data : data_qty
        })
        .then(response => {
            if(qty > 2){
                const temp_data = data.filter(list => list._id !== temp_detail._id);
                setData(temp_data);
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export {
    handleShowModalUpdate,
    handleUpdate
}