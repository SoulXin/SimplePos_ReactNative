import axios from 'axios'

const handleShowModalDetail = (item,setShow_Modal_Detail,setTemp_Data,setId,setName,setDate) => {
    setShow_Modal_Detail(true);
    setTemp_Data(item.work_list);
    setId(item._id);
    setName(item.name);
    setDate(item.date);
}

const handleComplete = async (id,user_id,data,temp_data,name,date,setShow_Modal_Detail,setName,setData,setLoading) => {
    setLoading(true);
    let temp_total = [];
    temp_data.map((list,index) => {
        return temp_total.push(list.pay_mechanic)
    });
    var sum_total = temp_total.reduce(function(a, b){
        return a + b;
    }, 0);
    var net_profit = sum_total - (sum_total * 0.2);
    const data_income = {
        user_id : user_id,
        date : date.substring(0,10),
        code : "Potongan Mekanik " + name,
        list_income : temp_data,
        income : net_profit
    }

    try{
        await axios.delete(`http://192.168.43.171:5000/employee_work/delete_mechanic/${name}/${user_id}`);
        const filter_data = data.filter(list => list._id !== id);
        setData(filter_data);
        setName('');
        if(name !== "Bawa Pulang"){
            await axios.post('http://192.168.43.171:5000/income/add_income',data_income);
            setLoading(false);
            setShow_Modal_Detail(false);
        }else{
            setLoading(false);
            setShow_Modal_Detail(false);
        }
    }catch(error){
        setLoading(false);
        Alert.alert('Pemberitahuan','Terjadi Masalah Pada Server,Silakan Hubungi Admin',[{text : 'OK'}]);
    }
}

export {
    handleShowModalDetail,
    handleComplete
}