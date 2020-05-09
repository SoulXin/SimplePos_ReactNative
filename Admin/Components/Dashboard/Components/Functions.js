import axios from 'axios'
import { removeFormatMoney,formatMoney } from '../../../Global_Functions/Functions'
import {Alert} from 'react-native'

const handleCloseModalQty = (setShowModalQty,setQty) => {
    setShowModalQty(false);
    setQty(1);
}

const handleOpenModalQty = (dataContext,item,setShowModalQty,setPay_Mechanic,setTemp_Add) => {
    setShowModalQty(true);
    setPay_Mechanic(0);
    setTemp_Add(item);
    if(dataContext.invoice_detail.invoice_id){
        axios({
            method : 'GET',
            url : `http://192.168.43.171:5000/invoice/detail_invoice/${dataContext.invoice_detail.invoice_id}`
        })
        .then(response => {
            response.data.product.filter((list,index) => {
                if(list.id === item._id){
                    setPay_Mechanic(formatMoney(list.pay_mechanic));
                }
            });
        })
        .catch(error => {
            Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
        })
    }else{
        dataContext.temp_data_invoice.filter(list => {
            if(list.id === item._id){
                setPay_Mechanic(formatMoney(list.pay_mechanic));
            }
        });
    }
}

const handleOpenModal = (item,setDetailProduct,setShowModal) => {
    setDetailProduct(item);
    setShowModal(true);
}

const handleSearchProduct = (text,fullData,setNameProduct,setData,setTempData) => {
    const formattedQuery = text.toLowerCase()
    const filter_data = fullData.filter(list => {
        if(list.product_name.toLowerCase().includes(formattedQuery)){
            return true
        }
        return false
    })
    setNameProduct(text);
    setData(filter_data)
    setTempData(filter_data)
}

const handleFocus = (reloadData,setNameProduct,setNameMotorcycle,setData) => {
    setNameProduct('');
    setNameMotorcycle('');
    setData(reloadData);
}

const handleSearchMotorcycle = (text,tempData,setNameMotorcycle,setData) => {
    let data_filter = [];
    const formattedQuery = text.toLowerCase();
    tempData.filter((list,index) => {
        list.product_type.filter(list_type => {
            if(list_type.name.toLowerCase().includes(formattedQuery)){
                data_filter.push(list);
            }
        })
    })
    setNameMotorcycle(text);
    setData(data_filter);;
}

const handleBack = (dataContext,dispatch,navigation) => {
    if(dataContext.view === "invoice_detail"){
        dispatch({type : 'CHANGE_VIEW',data : 'home'});
        dispatch({type : 'CLEAR_INVOICE_DETAIL'});
        navigation.navigate('InvoiceDetail');
    }else{
        dispatch({type : 'CHANGE_VIEW',data : 'home'})
        navigation.navigate('InvoiceForm');
    }
}

const handleAdd = async (temp_add,qty,pay_mechanic,dataContext,dispatch,setShowModalQty,setQty) => {
    setShowModalQty(false);
    const data = {
        id : temp_add._id,
        product_name : temp_add.product_name,
        product_capital : temp_add.product_capital,
        product_price : temp_add.product_price,
        qty : qty,
        pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0,
        product_qty : temp_add.qty
    }
    if(dataContext.invoice_detail.invoice_id){
        try{
            const detail_invoice = await axios.get(`http://192.168.43.171:5000/invoice/detail_invoice/${dataContext.invoice_detail.invoice_id}`);
            let temp_dataContext = await detail_invoice.data.product.filter((list,index) => {
                return list.id !== data.id
            });
            const filter_data = await detail_invoice.data.product.filter(list => {
                if(list.id.includes(data.id)){
                    return true
                }
                return false
            })
            
            if(filter_data.length){
                const temp_filter_data = {
                    id : filter_data[0].id,
                    product_name : filter_data[0].product_name,
                    product_price : filter_data[0].product_price,
                    product_capital : filter_data[0].product_capital,
                    product_qty : filter_data[0].qty,
                    qty : filter_data[0].qty + qty,
                    pay_mechanic : data.pay_mechanic
                }
                temp_dataContext.push(temp_filter_data);
                const data_already = {
                    bk : dataContext.invoice_detail.bk,
                    worker : dataContext.invoice_detail.worker,
                    product : temp_dataContext,
                }
    
                await axios.put(`http://192.168.43.171:5000/invoice/update_invoice/${dataContext.invoice_detail.invoice_id}`,data_already);
                return setQty(1) , temp_dataContext = [];
            }else{
                temp_dataContext.push(data);
                const new_data = {
                    bk : dataContext.invoice_detail.bk,
                    worker : dataContext.invoice_detail.worker,
                    product : temp_dataContext,
                }
    
                await axios.put(`http://192.168.43.171:5000/invoice/update_invoice/${dataContext.invoice_detail.invoice_id}`,new_data);
                return setQty(1),temp_dataContext = [];
            }
        }catch(error){
            Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
        }
    }else{
        const filter_data = dataContext.temp_data_invoice.filter(list => {
            if(list.id.includes(data.id)){
                return true
            }
            return false
        });

        if(filter_data.length){
            setQty(1);
            const filter = await dataContext.temp_data_invoice.filter(list => list.id === data.id);
            const temp_data_filter = await dataContext.temp_data_invoice.filter(list => list.id !== data.id);
            const data_filter = {
                id : filter[0].id,
                product_name : filter[0].product_name,
                product_price : filter[0].product_price,
                product_capital : filter[0].product_capital,
                product_qty : filter[0].qty,
                qty : filter[0].qty + data.qty,
                pay_mechanic : data.pay_mechanic
            }
            temp_data_filter.push(data_filter);                
            dispatch({type : 'ADD_TEMP_DATA_INVOICE',data : temp_data_filter});
        }else{
            setQty(1);
            let temp_data = dataContext.temp_data_invoice;
            temp_data.push(data);
            dispatch({type : 'ADD_TEMP_DATA_INVOICE',data : temp_data});
        }
    }
}
export {
    handleCloseModalQty,
    handleOpenModalQty,
    handleOpenModal,
    handleSearchProduct,
    handleFocus,
    handleSearchMotorcycle,
    handleBack,
    handleAdd
}