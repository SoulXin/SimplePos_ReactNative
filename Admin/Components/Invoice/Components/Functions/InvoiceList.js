import axios from 'axios'

const handleShowModalDelete = (id,bk,setShowModalDelete,setTemp_Id,setTemp_Bk) => {
setShowModalDelete(true);
setTemp_Id(id);
setTemp_Bk(bk);
}

const handleDelete = (data,temp_id,setShowModalDelete,setData) => {
    axios({
        method : 'DELETE',
        url : `http://192.168.43.171:5000/invoice/delete_invoice/${temp_id}`
    })
    .then(response => {
        setShowModalDelete(false);
        const temp_data = data.filter(list => list._id !== temp_id);
        setData(temp_data);
    })
    .catch(error => {
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
}

export {
    handleShowModalDelete,
    handleDelete
}