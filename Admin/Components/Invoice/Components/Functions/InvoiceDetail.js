import { formatMoney,removeFormatMoney } from '../../../../Global_Functions/Functions'
import axios from 'axios'
  
  const handleModalDetail = (id,index,data_product,setPay_Mechanic,setTemp_Detail,setShow_Modal_Detail,setIndex) => {
    var filtered = data_product.filter(list => {return list.id === id});
    setPay_Mechanic(formatMoney(filtered[0].pay_mechanic));
    setTemp_Detail(filtered[0]);
    setShow_Modal_Detail(true);
    data_product.splice(index,1);
    setIndex(index);
  }
  
  const handleUpdate = (
    index,
    invoice_id,
    temp_detail,
    temp_qty,
    pay_mechanic,
    bk,
    temp_mechanic,
    mechanic,
    data_Product,
    work_list,
    setShow_Modal_Detail,
    setTotal,
    setTotal_Pay_Mechanic,
    setTemp_Detail,
    setTemp_qty
    ) => {
    const temp_detail_product = {
        id : temp_detail.id,
        product_name : temp_detail.product_name,
        product_price : temp_detail.product_price,
        qty : temp_detail.qty + temp_qty,
        pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
    }
    const data = {
        bk : bk,
        mechanic : temp_mechanic ? temp_mechanic : mechanic,
        product : data_Product
    }
    const data_work_list = {
        id : temp_detail.id,
        motorcycle_code : bk,
        product_name : temp_detail.product_name,
        pay_mechanic : pay_mechanic ? removeFormatMoney(pay_mechanic) : 0
    }
  
    work_list.splice(index,1);
    data_Product.splice(index,0,temp_detail_product);
    work_list.splice(index,0,data_work_list);
  
    axios({
        method : 'PUT',
        url : `http://192.168.43.171:5000/invoice/update_invoice/${invoice_id}`,
        data : data
    })
    .then(response => {
        var temp_total = [];
        var temp_total_pay_mechanic = [];
  
        // Total Bill
        data_Product.map(list => {
            return temp_total.push(list.product_price * list.qty);
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);
  
        // Total Pay Mechanic
        data_Product.map(list => {
            return temp_total_pay_mechanic.push(list.pay_mechanic);
        })
        var sum_total_pay_mechanic = temp_total_pay_mechanic.reduce(function(a, b){
            return a + b;
        }, 0);
  
        setShow_Modal_Detail(false);
        setTotal(sum_total);
        setTotal_Pay_Mechanic(sum_total_pay_mechanic);
        setTemp_Detail('');
        setTemp_qty(0);
    })
    .catch(error => {
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
  }
  
  const handleDeleteProduct = (data_Product,temp_detail,bk,temp_Mechanic,mechanic,invoice_id,setShow_Modal_Detail,setTotal,setTemp_Detail,setTemp_qty) => {
    data_Product.filter(list => list.id !== temp_detail.id);
    
    const data = {
        bk : bk,
        mechanic : temp_Mechanic ? temp_Mechanic : mechanic,
        product : data_Product
    }
    axios({
        method : 'PUT',
        url : `http://192.168.43.171:5000/invoice/update_invoice/${invoice_id}`,
        data : data
    })
    .then(response => {
        var  temp_total = [];
        data_Product.map(list => {
            return temp_total.push(list.product_price * list.qty);
        })
        var sum_total = temp_total.reduce(function(a, b){
            return a + b;
        }, 0);
        
        setShow_Modal_Detail(false);
        setTotal(sum_total);
        setTemp_Detail('');
        setTemp_qty(0);
    })
    .catch(error => {
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    })
  }
  
  const handleDecrement = (temp_detail,temp_qty,setTemp_qty) => {
    if(temp_detail.qty + temp_qty > 0){
        setTemp_qty(temp_qty - 1)
    }else{
        console.log("sudah 0")
    }
  }
  
  const handleIncrement = (temp_qty,setTemp_qty) => {
    setTemp_qty(temp_qty + 1)
  }
  
  const handleAddProduct = (invoice_id,bk,mechanic,data_Product,dispatch,navigation) => {
    const data = {
        invoice_id : invoice_id,
        bk : bk,
        mechanic : mechanic,
        product : data_Product
    }
    dispatch({type : 'INVOICE_DETAIL',data : data});
    dispatch({type : 'CHANGE_VIEW',data : 'invoice_detail'});
    navigation.navigate('Home');
  }
  
  const handleComplete = async (
    user_id,
    bk,
    mechanic,
    data_Product,
    total,
    date_order,
    work_list,
    invoice_id,
    navigation,
    setLoading) => {
    setLoading(true);
    var temp_income = [];
    const data_invoice = {
        bk : bk,
        mechanic : mechanic,
        product : data_Product,
        total : total
    }
    
    const data = {
        user_id : user_id,
        date_order : date_order.substring(0,10),
        order : data_invoice
    }
  
    const data_employee = {
        user_id : user_id,
        name : mechanic,
        date_work : date_order.substring(0,10),
        work_list : work_list
    }
    
    data_invoice.product.map(list => {
        return temp_income.push((list.product_price * list.qty)- (list.product_capital * list.qty));
    })
    var sum_total_income = temp_income.reduce(function(a, b){
        return a + b;
    }, 0);

    const data_income = {
        user_id : user_id,
        date : date_order.substring(0,10),
        code : bk,
        list_income : data_Product,
        income : sum_total_income
    }
    try{
        await axios.delete(`http://192.168.43.171:5000/invoice/delete_invoice/${invoice_id}`)
        await axios.post('http://192.168.43.171:5000/sales/add_sales', data)
        if(data_employee.name !== "Bawa Pulang"){
            await axios.post('http://192.168.43.171:5000/employee_work/add_employee_work',data_employee)
        }
        await axios.post('http://192.168.43.171:5000/income/add_income',data_income)
        await data.order.product.map(list => {
            const data_update_qty = {
                qty : list.product_qty - list.qty
            }
            axios.put(`http://192.168.43.171:5000/product/update_qty/${list.id}`,data_update_qty)
        })
        return navigation.navigate('InvoiceList');
    }catch(error){
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    }
  }
  
  export {
    handleModalDetail,
    handleUpdate,
    handleDeleteProduct,
    handleDecrement,
    handleIncrement,
    handleAddProduct,
    handleComplete
  }