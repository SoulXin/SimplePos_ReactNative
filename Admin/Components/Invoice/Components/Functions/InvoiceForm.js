import axios from 'axios';
import {formatMoney,removeFormatMoney} from '../../../../Global_Functions/Functions'

const handleNavigation = (dispatch,navigation) => {
    dispatch({type : 'CHANGE_VIEW',data : 'invoice'});
    navigation.navigate('Home');
}

const handleModalDetail = (id,index,dataContext,setTemp_Detail,setPay_Mechanic,setShow_Modal_Detail,setIndex) => {
    const filter = dataContext.temp_data_invoice.filter(list => list.id === id);
    setTemp_Detail(filter[0]);
    setPay_Mechanic(formatMoney(filter[0].pay_mechanic));
    setShow_Modal_Detail(true);
    dataContext.temp_data_invoice.splice(index,1);
    setIndex(index);
}

const handleAdd = (user_id,bk,mechanic,dataContext,dispatch,setBK,setMechanic,navigation,Alert,setLoading) => {
    setLoading(true);
    if(bk){
        if(mechanic.length > 0 && mechanic !== "Kosong"){
            const data = {
                user_id : user_id,
                bk : bk,
                mechanic : mechanic,
                product : dataContext.temp_data_invoice
            }
            axios({
                method : 'POST',
                url : `http://192.168.43.171:5000/invoice/add_invoice`,
                data : data
            })
            .then(response => {
                setLoading(false);
                dispatch({type : 'CLEAR_TEMP_DATA_INVOICE'});
                setBK('');
                setMechanic('');
                Alert.alert('Pemberitahuan','Bon Berhasil Di Buat',[{text : 'OK',onPress : () => navigation.navigate('InvoiceList')}]);
            })
            .catch(error => {
                Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
            })
        }else{
            setLoading(false);
            Alert.alert('Pemberitahuan','Mekanik Tidak Boleh Kosong,Jika Tidak Ada Mekanik Maka Pilihlah \'Bawa Pulang \' ',[{text : 'OK'}])
        }
    }else{
        setLoading(false);
        Alert.alert('Pemberitahuan','BK Kereta Tidak Boleh Kosong',[{text : 'OK'}])
    }
}

const handleDelete = (setShow_Modal_Detail,setTemp_qty) => {
    setShow_Modal_Detail(false);
    setTemp_qty(0);
}

const handleUpdate = (temp_detail,temp_qty,pay_mechanic,dataContext,index,setShow_Modal_Detail,setTemp_qty) => {
    const temp_detail_product = {
        id : temp_detail.id,
        product_name : temp_detail.product_name,
        product_price : temp_detail.product_price,
        qty : temp_detail.qty + temp_qty,
        pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
    }
    dataContext.temp_data_invoice.splice(index,0,temp_detail_product);
    setShow_Modal_Detail(false);
    setTemp_qty(0);
}

const handleIncrement = (setTemp_qty,temp_qty) => {
    setTemp_qty(temp_qty + 1);
}

const handleDecrement = (temp_detail,temp_qty,setTemp_qty) => {
    if(temp_detail.qty + temp_qty > 0){
        setTemp_qty(temp_qty - 1)
    }else{
        console.log("sudah 0")
    }
}
export{
    handleNavigation,
    handleModalDetail,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleIncrement,
    handleDecrement
}